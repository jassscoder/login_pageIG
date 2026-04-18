// ============== API Configuration ==============
const getBackendURL = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }

    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:8080/api`;
};

const API_URL = window.__BACKEND_URL || getBackendURL();

const getThemeElements = () => ({
    sunIcon: document.getElementById('sunIcon'),
    moonIcon: document.getElementById('moonIcon')
});

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

const saveThemePreference = async (theme) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    try {
        await fetch(`${API_URL}/auth/theme`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ theme })
        });
    } catch (error) {
        // Keep UI responsive even if backend theme sync fails.
        console.error('Failed to sync theme preference:', error);
    }
};

const setTheme = (theme, syncToServer = false) => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    if (syncToServer) {
        saveThemePreference(theme);
    }
};

const validateEmailOrUsername = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
        return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length >= 3;
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
    const initialTheme = localStorage.getItem('theme') || 'light';
    applyTheme(initialTheme);

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

    const clearErrors = () => {
        [emailError, passwordError, formError].forEach((el) => {
            if (el) {
                el.textContent = '';
                el.classList.remove('show');
            }
        });
    };

    const showError = (el, message) => {
        if (el) {
            el.textContent = message;
            el.classList.add('show');
        }
    };

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            const emailUsername = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!validateEmailOrUsername(emailUsername)) {
                showError(emailError, 'Enter a valid email or username');
                return;
            }

            if (!password || password.length < 6) {
                showError(passwordError, 'Password must be at least 6 characters');
                return;
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

                if (formSuccess) {
                    formSuccess.textContent = 'Login successful! Redirecting...';
                    formSuccess.classList.add('show');
                }

                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1200);
            } catch (error) {
                console.error('Login error:', error);
                showError(formError, 'Connection error. Please try again.');
            }
        });
    }

    const signupLink = document.getElementById('signupLink');
    const signupModal = document.getElementById('signupModal');

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.openSignupModal();
        });
    }

    if (signupModal) {
        signupModal.addEventListener('click', (e) => {
            if (e.target === signupModal) {
                window.closeSignupModal();
            }
        });
    }
});