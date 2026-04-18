// ============== API Configuration ==============
// Automatically detect backend URL based on environment
const getBackendURL = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }
    // For Railway: use the backend service URL or your custom domain
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    // Railway will automatically set the BACKEND_URL if deployed together
    // For now, point to the same host on the default ports
    return `${protocol}//${hostname}:8080/api`;
};

const API_URL = window.__BACKEND_URL || getBackendURL();

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
                const response = await fetch(`${API_URL}/auth/login`, {
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