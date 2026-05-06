/* ============================================
   LOGIN.JS - Login/Register Page Scripts
   AutoElite - Automotive Workshop Website
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. TAB SWITCHING
    // ==========================================
    var tabButtons = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabName) {
        // Update buttons
        tabButtons.forEach(function (btn) {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
                btn.classList.remove('text-gray-500');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.classList.add('text-gray-500');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        // Update content panels with smooth transition
        tabContents.forEach(function (content) {
            if (content.id === 'tab-' + tabName) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(10px)';
                content.classList.add('active');

                // Trigger reflow for animation
                requestAnimationFrame(function () {
                    content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                });
            } else {
                content.classList.remove('active');
                content.style.opacity = '';
                content.style.transform = '';
            }
        });
    }

    // Tab button click handlers
    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            switchTab(this.getAttribute('data-tab'));
        });
    });

    // Switch to register link
    var switchToRegister = document.getElementById('switch-to-register');
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function (e) {
            e.preventDefault();
            switchTab('register');
        });
    }

    // Switch to login link
    var switchToLogin = document.getElementById('switch-to-login');
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function (e) {
            e.preventDefault();
            switchTab('login');
        });
    }


    // ==========================================
    // 2. TOAST NOTIFICATION
    // ==========================================
    function showToast(message, type) {
        var container = document.getElementById('toast-container');
        if (!container) return;

        var toast = document.createElement('div');
        toast.className = 'toast flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl transform translate-x-full transition-all duration-500 text-white text-sm font-medium';

        var bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
        toast.classList.add(bgColor);

        var iconClass = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';

        toast.innerHTML = '<i class="fas ' + iconClass + ' text-lg"></i><span>' + message + '</span>';

        container.appendChild(toast);

        // Trigger slide-in animation
        requestAnimationFrame(function () {
            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');
        });

        // Remove after 4 seconds
        setTimeout(function () {
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 500);
        }, 4000);
    }

    // Make showToast globally available
    window.showToast = showToast;


    // ==========================================
    // 3. VALIDATION HELPERS
    // ==========================================
    function showFieldValid(fieldGroup) {
        var input = fieldGroup.querySelector('.form-input');
        var errorMsg = fieldGroup.querySelector('.error-message');

        if (input) {
            input.classList.remove('border-red-500', 'bg-red-50');
            input.classList.add('border-green-500', 'bg-green-50');
        }

        if (errorMsg) {
            errorMsg.classList.add('hidden');
            errorMsg.textContent = '';
        }
    }

    function showFieldError(fieldGroup, message) {
        var input = fieldGroup.querySelector('.form-input');
        var errorMsg = fieldGroup.querySelector('.error-message');

        if (input) {
            input.classList.remove('border-green-500', 'bg-green-50');
            input.classList.add('border-red-500', 'bg-red-50');
        }

        if (errorMsg) {
            errorMsg.classList.remove('hidden');
            errorMsg.textContent = message;
        }
    }

    function resetFieldState(fieldGroup) {
        var input = fieldGroup.querySelector('.form-input');
        var errorMsg = fieldGroup.querySelector('.error-message');

        if (input) {
            input.classList.remove('border-green-500', 'bg-green-50', 'border-red-500', 'bg-red-50');
        }

        if (errorMsg) {
            errorMsg.classList.add('hidden');
            errorMsg.textContent = '';
        }
    }


    // ==========================================
    // 4. VALIDATION FUNCTIONS
    // ==========================================
    function validateEmail(value) {
        if (!value || value.trim().length === 0) {
            return { valid: false, message: 'El email es obligatorio.' };
        }
        var emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) {
            return { valid: false, message: 'Ingresa un email válido.' };
        }
        return { valid: true, message: '' };
    }

    function validatePassword(value) {
        if (!value || value.length === 0) {
            return { valid: false, message: 'La contraseña es obligatoria.' };
        }
        if (value.length < 6) {
            return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
        }
        return { valid: true, message: '' };
    }

    function validateName(value) {
        if (!value || value.trim().length === 0) {
            return { valid: false, message: 'El nombre es obligatorio.' };
        }
        if (value.trim().length < 3) {
            return { valid: false, message: 'El nombre debe tener al menos 3 caracteres.' };
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value.trim())) {
            return { valid: false, message: 'Solo se permiten letras y espacios.' };
        }
        return { valid: true, message: '' };
    }

    function validatePhone(value) {
        if (!value || value.trim().length === 0) {
            return { valid: false, message: 'El teléfono es obligatorio.' };
        }
        var cleaned = value.trim().replace(/\s/g, '');
        if (!/^[0-9]+$/.test(cleaned)) {
            return { valid: false, message: 'Solo se permiten números.' };
        }
        if (cleaned.length !== 9) {
            return { valid: false, message: 'El teléfono debe tener 9 dígitos.' };
        }
        if (!cleaned.startsWith('9')) {
            return { valid: false, message: 'El teléfono debe comenzar con 9.' };
        }
        return { valid: true, message: '' };
    }

    function validatePasswordConfirm(value, passwordValue) {
        if (!value || value.length === 0) {
            return { valid: false, message: 'Confirma tu contraseña.' };
        }
        if (value !== passwordValue) {
            return { valid: false, message: 'Las contraseñas no coinciden.' };
        }
        return { valid: true, message: '' };
    }


    // ==========================================
    // 5. PASSWORD STRENGTH CALCULATOR
    // ==========================================
    function calculatePasswordStrength(password) {
        if (!password || password.length === 0) {
            return { level: 0, label: '', color: '#e5e7eb' };
        }

        var score = 0;

        // Length checks
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;

        // Character variety checks
        if (/[a-z]/.test(password)) score++;         // lowercase
        if (/[A-Z]/.test(password)) score++;         // uppercase
        if (/[0-9]/.test(password)) score++;         // numbers
        if (/[^a-zA-Z0-9]/.test(password)) score++;  // special chars

        // Determine strength level
        if (score <= 2) {
            return { level: 1, label: 'Débil', color: '#ef4444' }; // red
        } else if (score <= 4) {
            return { level: 2, label: 'Media', color: '#f59e0b' }; // amber
        } else {
            return { level: 3, label: 'Fuerte', color: '#22c55e' }; // green
        }
    }

    function updatePasswordStrengthUI(password) {
        var strengthBar = document.getElementById('strength-bar');
        var strengthLabel = document.getElementById('strength-label');

        if (!strengthBar || !strengthLabel) return;

        var strength = calculatePasswordStrength(password);

        if (strength.level === 0) {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#e5e7eb';
            strengthLabel.textContent = '';
            strengthLabel.className = 'text-xs font-semibold text-gray-400';
        } else {
            var widths = { 1: '33%', 2: '66%', 3: '100%' };
            var labelColors = { 1: 'text-red-500', 2: 'text-amber-500', 3: 'text-green-500' };

            strengthBar.style.width = widths[strength.level];
            strengthBar.style.backgroundColor = strength.color;
            strengthLabel.textContent = strength.label;
            strengthLabel.className = 'text-xs font-semibold ' + labelColors[strength.level];
        }
    }

    // Attach strength indicator to register password field
    var registerPassword = document.getElementById('register-password');
    if (registerPassword) {
        registerPassword.addEventListener('input', function () {
            updatePasswordStrengthUI(this.value);
        });
    }


    // ==========================================
    // 6. PASSWORD VISIBILITY TOGGLE
    // ==========================================
    function initPasswordToggle(toggleId, inputId) {
        var toggleBtn = document.getElementById(toggleId);
        var input = document.getElementById(inputId);

        if (!toggleBtn || !input) return;

        toggleBtn.addEventListener('click', function () {
            var icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    initPasswordToggle('toggle-login-password', 'login-password');
    initPasswordToggle('toggle-register-password', 'register-password');
    initPasswordToggle('toggle-register-confirm-password', 'register-confirm-password');


    // ==========================================
    // 7. LOGIN FORM VALIDATION & SUBMISSION
    // ==========================================
    var loginForm = document.getElementById('login-form');
    var loginEmail = document.getElementById('login-email');
    var loginPassword = document.getElementById('login-password');
    var loginSubmit = document.getElementById('login-submit');
    var forgotPasswordLink = document.getElementById('forgot-password-link');

    // Forgot password handler
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Función próximamente disponible', 'info');
        });
    }

    // Real-time validation for login email
    if (loginEmail) {
        loginEmail.addEventListener('input', function () {
            var fieldGroup = this.closest('.form-group');
            if (this.value.trim().length === 0) {
                resetFieldState(fieldGroup);
            } else {
                var result = validateEmail(this.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                }
            }
        });

        loginEmail.addEventListener('blur', function () {
            var fieldGroup = this.closest('.form-group');
            var result = validateEmail(this.value);
            if (result.valid) {
                showFieldValid(fieldGroup);
            } else {
                showFieldError(fieldGroup, result.message);
            }
        });
    }

    // Real-time validation for login password
    if (loginPassword) {
        loginPassword.addEventListener('input', function () {
            var fieldGroup = this.closest('.form-group');
            if (this.value.length === 0) {
                resetFieldState(fieldGroup);
            } else {
                var result = validatePassword(this.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                }
            }
        });

        loginPassword.addEventListener('blur', function () {
            var fieldGroup = this.closest('.form-group');
            var result = validatePassword(this.value);
            if (result.valid) {
                showFieldValid(fieldGroup);
            } else {
                showFieldError(fieldGroup, result.message);
            }
        });
    }

    // Login form submit
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate all fields
            var emailGroup = loginEmail.closest('.form-group');
            var passwordGroup = loginPassword.closest('.form-group');
            var emailResult = validateEmail(loginEmail.value);
            var passwordResult = validatePassword(loginPassword.value);
            var hasErrors = false;

            if (!emailResult.valid) {
                showFieldError(emailGroup, emailResult.message);
                hasErrors = true;
            } else {
                showFieldValid(emailGroup);
            }

            if (!passwordResult.valid) {
                showFieldError(passwordGroup, passwordResult.message);
                hasErrors = true;
            } else {
                showFieldValid(passwordGroup);
            }

            if (hasErrors) return;

            // Show loading state
            var originalContent = loginSubmit.innerHTML;
            loginSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Ingresando...</span>';
            loginSubmit.disabled = true;

            // Simulated login (1.5s delay)
            setTimeout(function () {
                showToast('¡Inicio de sesión exitoso! Redirigiendo...', 'success');

                // Restore button
                loginSubmit.innerHTML = originalContent;
                loginSubmit.disabled = false;

                // Reset form
                loginForm.reset();
                resetFieldState(emailGroup);
                resetFieldState(passwordGroup);

                // Redirect to index after 2 seconds
                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        });
    }


    // ==========================================
    // 8. REGISTER FORM VALIDATION & SUBMISSION
    // ==========================================
    var registerForm = document.getElementById('register-form');
    var registerName = document.getElementById('register-name');
    var registerEmail = document.getElementById('register-email');
    var registerPhone = document.getElementById('register-phone');
    var registerConfirmPassword = document.getElementById('register-confirm-password');
    var registerTerms = document.getElementById('register-terms');
    var registerSubmit = document.getElementById('register-submit');
    var termsError = document.getElementById('terms-error');

    // Track validity for enabling submit button
    function checkRegisterFormValidity() {
        var allValid = true;

        var fields = [
            { el: registerName, fn: validateName },
            { el: registerEmail, fn: validateEmail },
            { el: registerPhone, fn: validatePhone },
            { el: registerPassword, fn: validatePassword },
            { el: registerConfirmPassword, fn: function (v) { return validatePasswordConfirm(v, registerPassword.value); } }
        ];

        fields.forEach(function (f) {
            if (!f.el) return;
            var result = f.fn(f.el.value);
            if (!result.valid || f.el.value.trim().length === 0) {
                allValid = false;
            }
        });

        // Check terms checkbox
        if (registerTerms && !registerTerms.checked) {
            allValid = false;
        }

        if (registerSubmit) {
            registerSubmit.disabled = !allValid;
        }
    }

    // Real-time validation for register name
    if (registerName) {
        registerName.addEventListener('input', function () {
            var fieldGroup = this.closest('.form-group');
            if (this.value.trim().length === 0) {
                resetFieldState(fieldGroup);
            } else {
                var result = validateName(this.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                }
            }
            checkRegisterFormValidity();
        });

        registerName.addEventListener('blur', function () {
            var fieldGroup = this.closest('.form-group');
            var result = validateName(this.value);
            if (result.valid) {
                showFieldValid(fieldGroup);
            } else {
                showFieldError(fieldGroup, result.message);
            }
        });
    }

    // Real-time validation for register email
    if (registerEmail) {
        registerEmail.addEventListener('input', function () {
            var fieldGroup = this.closest('.form-group');
            if (this.value.trim().length === 0) {
                resetFieldState(fieldGroup);
            } else {
                var result = validateEmail(this.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                }
            }
            checkRegisterFormValidity();
        });

        registerEmail.addEventListener('blur', function () {
            var fieldGroup = this.closest('.form-group');
            var result = validateEmail(this.value);
            if (result.valid) {
                showFieldValid(fieldGroup);
            } else {
                showFieldError(fieldGroup, result.message);
            }
        });
    }

    // Real-time validation for register phone
    if (registerPhone) {
        registerPhone.addEventListener('input', function () {
            // Allow only digits
            this.value = this.value.replace(/[^0-9]/g, '');

            var fieldGroup = this.closest('.form-group');
            if (this.value.trim().length === 0) {
                resetFieldState(fieldGroup);
            } else {
                var result = validatePhone(this.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                }
            }
            checkRegisterFormValidity();
        });

        registerPhone.addEventListener('blur', function () {
            var fieldGroup = this.closest('.form-group');
            var result = validatePhone(this.value);
            if (result.valid) {
                showFieldValid(fieldGroup);
            } else {
                showFieldError(fieldGroup, result.message);
            }
        });
    }

    // Real-time validation for register password
    if (registerPassword) {
        registerPassword.addEventListener('input', function () {
            var fieldGroup = this.closest('.form-group');
            if (this.value.length === 0) {
                resetFieldState(fieldGroup);
            } else {
                var result = validatePassword(this.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                }
            }

            // Also re-validate confirm password if it has a value
            if (registerConfirmPassword && registerConfirmPassword.value.length > 0) {
                var confirmGroup = registerConfirmPassword.closest('.form-group');
                var confirmResult = validatePasswordConfirm(registerConfirmPassword.value, this.value);
                if (confirmResult.valid) {
                    showFieldValid(confirmGroup);
                } else {
                    showFieldError(confirmGroup, confirmResult.message);
                }
            }

            checkRegisterFormValidity();
        });

        registerPassword.addEventListener('blur', function () {
            var fieldGroup = this.closest('.form-group');
            var result = validatePassword(this.value);
            if (result.valid) {
                showFieldValid(fieldGroup);
            } else {
                showFieldError(fieldGroup, result.message);
            }
        });
    }

    // Real-time validation for register confirm password
    if (registerConfirmPassword) {
        registerConfirmPassword.addEventListener('input', function () {
            var fieldGroup = this.closest('.form-group');
            if (this.value.length === 0) {
                resetFieldState(fieldGroup);
            } else {
                var result = validatePasswordConfirm(this.value, registerPassword.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                }
            }
            checkRegisterFormValidity();
        });

        registerConfirmPassword.addEventListener('blur', function () {
            var fieldGroup = this.closest('.form-group');
            var result = validatePasswordConfirm(this.value, registerPassword.value);
            if (result.valid) {
                showFieldValid(fieldGroup);
            } else {
                showFieldError(fieldGroup, result.message);
            }
        });
    }

    // Terms checkbox validation
    if (registerTerms) {
        registerTerms.addEventListener('change', function () {
            if (!this.checked) {
                if (termsError) {
                    termsError.textContent = 'Debes aceptar los términos y condiciones.';
                    termsError.classList.remove('hidden');
                }
            } else {
                if (termsError) {
                    termsError.classList.add('hidden');
                    termsError.textContent = '';
                }
            }
            checkRegisterFormValidity();
        });
    }

    // Register form submit
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate all fields
            var hasErrors = false;
            var fieldValidations = [
                { el: registerName, fn: validateName },
                { el: registerEmail, fn: validateEmail },
                { el: registerPhone, fn: validatePhone },
                { el: registerPassword, fn: validatePassword },
                { el: registerConfirmPassword, fn: function (v) { return validatePasswordConfirm(v, registerPassword.value); } }
            ];

            fieldValidations.forEach(function (f) {
                if (!f.el) return;
                var fieldGroup = f.el.closest('.form-group');
                var result = f.fn(f.el.value);
                if (result.valid) {
                    showFieldValid(fieldGroup);
                } else {
                    showFieldError(fieldGroup, result.message);
                    hasErrors = true;
                }
            });

            // Check terms
            if (registerTerms && !registerTerms.checked) {
                if (termsError) {
                    termsError.textContent = 'Debes aceptar los términos y condiciones.';
                    termsError.classList.remove('hidden');
                }
                hasErrors = true;
            }

            if (hasErrors) return;

            // Show loading state
            var originalContent = registerSubmit.innerHTML;
            registerSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Registrando...</span>';
            registerSubmit.disabled = true;

            // Simulated registration (1.5s delay)
            setTimeout(function () {
                showToast('¡Registro exitoso! Redirigiendo al inicio de sesión...', 'success');

                // Restore button
                registerSubmit.innerHTML = originalContent;
                registerSubmit.disabled = true; // Will be enabled by checkRegisterFormValidity on reset

                // Reset form
                registerForm.reset();
                updatePasswordStrengthUI('');

                // Reset all field states
                fieldValidations.forEach(function (f) {
                    if (f.el) {
                        resetFieldState(f.el.closest('.form-group'));
                    }
                });

                if (termsError) {
                    termsError.classList.add('hidden');
                    termsError.textContent = '';
                }

                // Switch to login tab after a brief pause
                setTimeout(function () {
                    switchTab('login');
                }, 2000);
            }, 1500);
        });
    }

});