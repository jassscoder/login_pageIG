const getBackendURL = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }

    return `${window.location.origin}/api`;
};

const API_URL = window.__BACKEND_URL || getBackendURL();

const PALETTES = {
    morning: {
        a: '#ff8d66',
        b: '#ffdca8',
        c: '#89cff0'
    },
    afternoon: {
        a: '#ff7f67',
        b: '#ffc58a',
        c: '#6ec2f2'
    },
    night: {
        a: '#35518d',
        b: '#8b3667',
        c: '#63439c'
    }
};

const STATUS_MESSAGES = [
    'Waking up your feed...',
    'Checking your profile...',
    'Preparing your stories...'
];

const getThemeElements = () => ({
    sunIcon: document.getElementById('sunIcon'),
    moonIcon: document.getElementById('moonIcon')
});

const applyPalette = (paletteName) => {
    const root = document.documentElement;
    const palette = PALETTES[paletteName] || PALETTES.morning;

    root.style.setProperty('--gradient-a', palette.a);
    root.style.setProperty('--gradient-b', palette.b);
    root.style.setProperty('--gradient-c', palette.c);
    localStorage.setItem('palette', paletteName);
};

const getDefaultPalette = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'morning';
    }

    if (hour >= 12 && hour < 18) {
        return 'afternoon';
    }

    return 'night';
};

const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    const { sunIcon, moonIcon } = getThemeElements();
    if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
    }
};

const setTheme = (theme, syncToServer = false) => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    if (syncToServer) {
        void saveUiSettings({ theme });
    }
};

const playIntroAnimation = (enabled) => {
    const overlay = document.getElementById('introOverlay');
    const page = document.getElementById('pageRoot');

    if (!page) {
        return;
    }

    const finalize = () => {
        page.classList.add('ready');
        if (overlay) {
            overlay.classList.add('done');
        }
    };

    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (overlay) {
            overlay.style.display = 'none';
        }
        requestAnimationFrame(() => page.classList.add('ready'));
        return;
    }

    window.setTimeout(finalize, 1200);
};

const validateEmailOrUsername = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
        return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length >= 3;
};

const showError = (el, message) => {
    if (el) {
        el.textContent = message;
        el.classList.add('show');
    }
};

const clearMessages = (emailError, passwordError, formError, formSuccess, statusText) => {
    [emailError, passwordError, formError, formSuccess, statusText].forEach((el) => {
        if (!el) {
            return;
        }
        el.textContent = '';
        el.classList.remove('show');
    });
};

const createRipple = (button, event) => {
    const rect = button.getBoundingClientRect();
    const x = `${event.clientX - rect.left}px`;
    const y = `${event.clientY - rect.top}px`;

    button.style.setProperty('--ripple-x', x);
    button.style.setProperty('--ripple-y', y);
    button.classList.remove('ripple');

    requestAnimationFrame(() => {
        button.classList.add('ripple');
    });
};

const saveUiSettings = async (partialSettings) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    try {
        const payload = {
            theme: localStorage.getItem('theme') || undefined,
            palette: localStorage.getItem('palette') || undefined,
            introAnimationEnabled: localStorage.getItem('introAnimationEnabled') !== 'false',
            ...partialSettings
        };

        await fetch(`${API_URL}/auth/ui-settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error('Failed to sync UI settings:', error);
    }
};

window.togglePassword = function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) {
        return;
    }
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
};

window.openSignupModal = function openSignupModal() {
    const signupModal = document.getElementById('signupModal');
    if (signupModal) {
        signupModal.classList.remove('hidden');
    }
};

window.closeSignupModal = function closeSignupModal() {
    const signupModal = document.getElementById('signupModal');
    if (signupModal) {
        signupModal.classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedPalette = localStorage.getItem('palette') || getDefaultPalette();
    const introAnimationEnabled = localStorage.getItem('introAnimationEnabled') !== 'false';

    applyTheme(savedTheme);
    applyPalette(savedPalette);
    playIntroAnimation(introAnimationEnabled);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            setTheme(nextTheme, true);
        });
    }

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailUsername');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
    const statusText = document.getElementById('statusText');
    const loginButton = document.getElementById('loginButton');
    const signupLink = document.getElementById('signupLink');
    const signupModal = document.getElementById('signupModal');

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            createRipple(loginButton, event);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearMessages(emailError, passwordError, formError, formSuccess, statusText);

            const emailUsername = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!validateEmailOrUsername(emailUsername)) {
                showError(emailError, 'Enter a valid email or username.');
                return;
            }

            if (!password || password.length < 6) {
                showError(passwordError, 'Password must be at least 6 characters.');
                return;
            }

            const randomStatus = STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)];
            if (statusText) {
                statusText.textContent = randomStatus;
                statusText.classList.add('show');
            }

            if (loginButton) {
                loginButton.classList.add('loading');
                loginButton.disabled = true;
            }

            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emailUsername, password })
                });

                const data = await response.json();
                if (!response.ok) {
                    showError(formError, data.message || 'Login failed');
                    return;
                }

                localStorage.setItem('token', data.token);

                const serverTheme = data.user && data.user.preferredTheme;
                if (serverTheme === 'dark' || serverTheme === 'light') {
                    setTheme(serverTheme, false);
                }

                const serverPalette = data.user && data.user.preferredPalette;
                if (serverPalette && PALETTES[serverPalette]) {
                    applyPalette(serverPalette);
                }

                const serverIntro = data.user && data.user.introAnimationEnabled;
                if (typeof serverIntro === 'boolean') {
                    localStorage.setItem('introAnimationEnabled', String(serverIntro));
                }

                if (formSuccess) {
                    formSuccess.textContent = 'Login successful! Redirecting...';
                    formSuccess.classList.add('show');
                }

                await saveUiSettings();

                window.setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1100);
            } catch (error) {
                console.error('Login error:', error);
                showError(formError, 'Connection error. Please try again.');
            } finally {
                if (loginButton) {
                    loginButton.classList.remove('loading');
                    loginButton.disabled = false;
                }
            }
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.openSignupModal();
        });
    }

    if (signupModal) {
        signupModal.addEventListener('click', (event) => {
            if (event.target === signupModal) {
                window.closeSignupModal();
            }
        });
    }
});
