// Immediately apply saved theme before page renders
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.documentElement.style.colorScheme = 'dark';
    document.body.classList.add('dark-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    // ============== THEME TOGGLE ==============
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Sync icons with current theme
    const isDarkNow = document.body.classList.contains('dark-mode');
    if (sunIcon && moonIcon) {
        sunIcon.style.display = isDarkNow ? 'none' : 'block';
        moonIcon.style.display = isDarkNow ? 'block' : 'none';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (sunIcon && moonIcon) {
                sunIcon.style.display = isDark ? 'none' : 'block';
                moonIcon.style.display = isDark ? 'block' : 'none';
            }
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        });
    }

    // ============== LOGIN FORM ==============
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailUsername');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length >= 3;
    }

    function showError(input, errorEl, msg) {
        if (input && input.parentElement) {
            input.parentElement.classList.add('error');
        }
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.classList.add('show');
        }
    }

    function clearErrors() {
        if (emailError) {
            emailError.textContent = '';
            emailError.classList.remove('show');
        }
        if (passwordError) {
            passwordError.textContent = '';
            passwordError.classList.remove('show');
        }
        if (formError) {
            formError.textContent = '';
            formError.classList.remove('show');
        }
        if (emailInput && emailInput.parentElement) {
            emailInput.parentElement.classList.remove('error');
        }
        if (passwordInput && passwordInput.parentElement) {
            passwordInput.parentElement.classList.remove('error');
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value.trim() : '';

            if (!email) {
                showError(emailInput, emailError, 'Email or username is required');
                return;
            }

            if (!validateEmail(email)) {
                showError(emailInput, emailError, 'Invalid email or username');
                return;
            }

            if (!password) {
                showError(passwordInput, passwordError, 'Password is required');
                return;
            }

            if (password.length < 6) {
                showError(passwordInput, passwordError, 'Password must be at least 6 characters');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    if (formError) {
                        formError.textContent = data.message || 'Login failed';
                        formError.classList.add('show');
                    }
                    return;
                }

                localStorage.setItem('token', data.token);
                if (formSuccess) {
                    formSuccess.textContent = 'Login successful! Redirecting...';
                    formSuccess.classList.add('show');
                }
                
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);

            } catch (error) {
                if (formError) {
                    formError.textContent = 'Connection error. Please try again.';
                    formError.classList.add('show');
                }
            }
        });
    }

    // ============== PASSWORD TOGGLE ==============
    window.togglePassword = function() {
        if (passwordInput) {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
        }
    }

    // ============== SIGNUP MODAL ==============
    const signupLink = document.getElementById('signupLink');
    const signupModal = document.getElementById('signupModal');

    window.openSignupModal = function() {
        if (signupModal) {
            signupModal.classList.remove('hidden');
        }
    }

    window.closeSignupModal = function() {
        if (signupModal) {
            signupModal.classList.add('hidden');
        }
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.openSignupModal();
        });
    }

    // Close modal when clicking outside
    if (signupModal) {
        document.addEventListener('click', (e) => {
            if (e.target === signupModal) {
                window.closeSignupModal();
            }
        });
    }
});
// Configuration
const API_URL = 'http://localhost:5000/api';

/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    sunIcon.style.display = isDarkMode ? 'none' : 'block';
    moonIcon.style.display = isDarkMode ? 'block' : 'none';
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

/* ============ CAROUSEL FUNCTIONALITY ============ */
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const slideInterval = 4000;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance carousel
if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
}

// Manual indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

/* ============ FORM VALIDATION ============ */
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailUsername');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || email.length >= 3;
}

function clearErrors() {
    emailError.textContent = '';
    passwordError.textContent = '';
    formError.textContent = '';
    emailInput.parentElement.classList.remove('error');
    passwordInput.parentElement.classList.remove('error');
}

function showError(input, errorElement, message) {
    input.parentElement.classList.add('error');
    errorElement.textContent = message;
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const emailUsername = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!emailUsername) {
            showError(emailInput, emailError, 'Username, email or phone is required');
            return;
        }

        if (!validateEmail(emailUsername)) {
            showError(emailInput, emailError, 'Invalid email or username');
            return;
        }

        if (!password) {
            showError(passwordInput, passwordError, 'Password is required');
            return;
        }

        if (password.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailUsername,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                formError.textContent = data.message || 'Login failed. Please try again.';
                return;
            }

            // Successful login
            localStorage.setItem('token', data.token);
            formSuccess.textContent = 'Login successful! Redirecting...';
            formSuccess.classList.add('show');
            
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);

        } catch (error) {
            formError.textContent = 'Connection error. Please try again.';
        }
    });
}

/* ============ PASSWORD VISIBILITY TOGGLE ============ */
function togglePassword() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

/* ============ SIGNUP MODAL ============ */
const signupLink = document.getElementById('signupLink');
const createAccountBtn = document.getElementById('createAccountBtn');
const signupModal = document.getElementById('signupModal');
const closeBtn = document.querySelector('.close-btn');

function openSignupModal() {
    if (signupModal) {
        signupModal.classList.remove('hidden');
    }
}

function closeSignupModal() {
    if (signupModal) {
        signupModal.classList.add('hidden');
    }
}

if (signupLink) {
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        openSignupModal();
    });
}

if (createAccountBtn) {
    createAccountBtn.addEventListener('click', openSignupModal);
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeSignupModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        closeSignupModal();
    }
});

/* ============ SIGNUP FORM HANDLER ============ */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Signup functionality will be added here
    });
}
// Configuration
const API_URL = 'http://localhost:5000/api';

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupModal = document.getElementById('signupModal');
const signupLink = document.getElementById('signupLink');
const closeBtn = document.querySelector('.close-btn');

// Event Listeners
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    openSignupModal();
});

const createAccountBtn = document.getElementById('createAccountBtn');
if (createAccountBtn) {
    createAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSignupModal();
    });
}

closeBtn.addEventListener('click', closeSignupModal);

window.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        closeSignupModal();
    }
});

// Login Form Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailUsername = document.getElementById('emailUsername').value.trim();
    const password = document.getElementById('password').value;
    
    // Clear previous errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('formError').textContent = '';
    
    // Validation
    if (!emailUsername) {
        document.getElementById('emailError').textContent = 'Phone number, username or email is required';
        return;
    }
    
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        return;
    }
    
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        return;
    }
    
    // Disable button during submission
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailUsername,
                password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token
            localStorage.setItem('token', data.token);
            showToast('Login successful!');
            
            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = '/dashboard.html'; // Change to your dashboard URL
            }, 1000);
        } else {
            document.getElementById('formError').textContent = data.message || 'Login failed';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('formError').textContent = 'Connection error. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log in';
    }
});

// Signup Form Handler
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value.trim();
    const fullName = document.getElementById('signupUsername').value.trim();
    const username = document.getElementById('signupUser').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    // Clear previous errors
    document.querySelectorAll('#signupForm .error-message').forEach(el => {
        el.textContent = '';
    });
    
    // Validation
    let hasError = false;
    
    if (!email) {
        document.querySelectorAll('#signupForm .error-message')[0].textContent = 'Email is required';
        hasError = true;
    } else if (!validateEmail(email)) {
        document.querySelectorAll('#signupForm .error-message')[0].textContent = 'Invalid email format';
        hasError = true;
    }
    
    if (!fullName) {
        document.querySelectorAll('#signupForm .error-message')[1].textContent = 'Full name is required';
        hasError = true;
    }
    
    if (!username) {
        document.querySelectorAll('#signupForm .error-message')[2].textContent = 'Username is required';
        hasError = true;
    } else if (username.length < 3) {
        document.querySelectorAll('#signupForm .error-message')[2].textContent = 'Username must be at least 3 characters';
        hasError = true;
    }
    
    if (!password) {
        document.querySelectorAll('#signupForm .error-message')[3].textContent = 'Password is required';
        hasError = true;
    } else if (password.length < 6) {
        document.querySelectorAll('#signupForm .error-message')[3].textContent = 'Password must be at least 6 characters';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Disable button during submission
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                fullName,
                username,
                password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('Account created! Redirecting to login...');
            setTimeout(() => {
                closeSignupModal();
                loginForm.reset();
                document.getElementById('emailUsername').focus();
            }, 1500);
        } else {
            document.getElementById('signupFormError').textContent = data.message || 'Registration failed';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('signupFormError').textContent = 'Connection error. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign up';
    }
});

// Helper Functions
function openSignupModal() {
    signupModal.classList.remove('hidden');
}

function closeSignupModal() {
    signupModal.classList.add('hidden');
    signupForm.reset();
    document.querySelectorAll('#signupForm .error-message').forEach(el => {
        el.textContent = '';
    });
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Real-time Validation
document.getElementById('emailUsername').addEventListener('blur', function() {
    if (!this.value.trim()) {
        document.getElementById('emailError').textContent = 'This field is required';
    } else {
        document.getElementById('emailError').textContent = '';
    }
});

document.getElementById('password').addEventListener('blur', function() {
    if (!this.value) {
        document.getElementById('passwordError').textContent = 'Password is required';
    } else if (this.value.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
    } else {
        document.getElementById('passwordError').textContent = '';
    }
});