/* ============================================
   CONTACTO.JS - Contact Page Scripts
   AutoElite - Automotive Workshop Website
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. VALIDATION FUNCTIONS OBJECT
    // ==========================================
    var validation = {
        // Validate name: min 3 chars, only letters and spaces
        nombre: function (value) {
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
        },

        // Validate email format with regex
        email: function (value) {
            if (!value || value.trim().length === 0) {
                return { valid: false, message: 'El email es obligatorio.' };
            }
            var emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value.trim())) {
                return { valid: false, message: 'Ingresa un email válido (ej: usuario@correo.com).' };
            }
            return { valid: true, message: '' };
        },

        // Validate phone: 9 digits, starts with 9
        telefono: function (value) {
            if (!value || value.trim().length === 0) {
                return { valid: false, message: 'El teléfono es obligatorio.' };
            }
            var cleaned = value.trim().replace(/\s/g, '');
            if (!/^[0-9]+$/.test(cleaned)) {
                return { valid: false, message: 'Solo se permiten números.' };
            }
            if (cleaned.length !== 9) {
                return { valid: false, message: 'El teléfono debe tener exactamente 9 dígitos.' };
            }
            if (!cleaned.startsWith('9')) {
                return { valid: false, message: 'El teléfono debe comenzar con 9.' };
            }
            return { valid: true, message: '' };
        },

        // Validate select fields (not empty)
        select: function (value) {
            if (!value || value === '') {
                return { valid: false, message: 'Por favor selecciona una opción.' };
            }
            return { valid: true, message: '' };
        },

        // Validate date (not empty, not in the past)
        fecha: function (value) {
            if (!value || value === '') {
                return { valid: false, message: 'La fecha es obligatoria.' };
            }
            var selectedDate = new Date(value + 'T00:00:00');
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                return { valid: false, message: 'La fecha no puede ser anterior a hoy.' };
            }
            return { valid: true, message: '' };
        },

        // Validate message: min 10 chars, max 500 chars
        mensaje: function (value) {
            if (!value || value.trim().length === 0) {
                return { valid: false, message: 'El mensaje es obligatorio.' };
            }
            if (value.trim().length < 10) {
                return { valid: false, message: 'El mensaje debe tener al menos 10 caracteres.' };
            }
            if (value.length > 500) {
                return { valid: false, message: 'El mensaje no puede exceder los 500 caracteres.' };
            }
            return { valid: true, message: '' };
        }
    };


    // ==========================================
    // 2. FORM FIELD CONFIGURATION MAP
    // ==========================================
    var fieldConfig = {
        'contact-name': { type: 'nombre' },
        'contact-email': { type: 'email' },
        'contact-phone': { type: 'telefono' },
        'contact-vehicle': { type: 'select' },
        'contact-service': { type: 'select' },
        'contact-date': { type: 'fecha' },
        'contact-message': { type: 'mensaje' }
    };


    // ==========================================
    // 3. UI HELPERS - Show validation state
    // ==========================================
    function showFieldValid(fieldGroup) {
        var input = fieldGroup.querySelector('.form-input');
        var icon = fieldGroup.querySelector('.validation-icon');
        var errorMsg = fieldGroup.querySelector('.error-message');

        input.classList.remove('border-red-500', 'bg-red-50');
        input.classList.add('border-green-500', 'bg-green-50');

        if (icon) {
            icon.classList.remove('hidden', 'text-red-500');
            icon.classList.add('text-green-500');
            icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        }

        if (errorMsg) {
            errorMsg.classList.add('hidden');
            errorMsg.textContent = '';
        }
    }

    function showFieldError(fieldGroup, message) {
        var input = fieldGroup.querySelector('.form-input');
        var icon = fieldGroup.querySelector('.validation-icon');
        var errorMsg = fieldGroup.querySelector('.error-message');

        input.classList.remove('border-green-500', 'bg-green-50');
        input.classList.add('border-red-500', 'bg-red-50');

        if (icon) {
            icon.classList.remove('hidden', 'text-green-500');
            icon.classList.add('text-red-500');
            icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        }

        if (errorMsg) {
            errorMsg.classList.remove('hidden');
            errorMsg.textContent = message;
        }
    }

    function resetFieldState(fieldGroup) {
        var input = fieldGroup.querySelector('.form-input');
        var icon = fieldGroup.querySelector('.validation-icon');
        var errorMsg = fieldGroup.querySelector('.error-message');

        input.classList.remove('border-green-500', 'bg-green-50', 'border-red-500', 'bg-red-50');

        if (icon) {
            icon.classList.add('hidden');
            icon.classList.remove('text-green-500', 'text-red-500');
            icon.innerHTML = '';
        }

        if (errorMsg) {
            errorMsg.classList.add('hidden');
            errorMsg.textContent = '';
        }
    }


    // ==========================================
    // 4. VALIDATE A SINGLE FIELD
    // ==========================================
    function validateField(fieldId) {
        var config = fieldConfig[fieldId];
        if (!config) return true;

        var fieldGroup = document.getElementById(fieldId).closest('.form-group');
        var value = document.getElementById(fieldId).value;
        var result = validation[config.type](value);

        if (value === '' || value === undefined || value === null) {
            // Don't show error on empty untouched fields
            resetFieldState(fieldGroup);
            return false;
        }

        if (result.valid) {
            showFieldValid(fieldGroup);
        } else {
            showFieldError(fieldGroup, result.message);
        }

        return result.valid;
    }


    // ==========================================
    // 5. CHECK ALL FIELDS & TOGGLE SUBMIT
    // ==========================================
    var formFieldsTouched = {};

    function checkFormValidity() {
        var allValid = true;
        var allTouched = false;

        Object.keys(fieldConfig).forEach(function (fieldId) {
            var el = document.getElementById(fieldId);
            if (!el) return;
            var config = fieldConfig[fieldConfig[fieldId].type];
            var value = el.value;
            var result = validation[fieldConfig[fieldId].type](value);

            if (!result.valid) {
                allValid = false;
            }

            if (value !== '' && value !== undefined && value !== null) {
                formFieldsTouched[fieldId] = true;
            }
        });

        // Check that all fields have been touched
        allTouched = Object.keys(fieldConfig).every(function (fieldId) {
            return formFieldsTouched[fieldId];
        });

        var submitBtn = document.getElementById('contact-submit');
        if (submitBtn) {
            submitBtn.disabled = !(allValid && allTouched);
        }
    }


    // ==========================================
    // 6. REAL-TIME VALIDATION EVENT LISTENERS
    // ==========================================
    Object.keys(fieldConfig).forEach(function (fieldId) {
        var el = document.getElementById(fieldId);
        if (!el) return;

        // Validate on input (for real-time feedback)
        el.addEventListener('input', function () {
            validateField(fieldId);
            checkFormValidity();
        });

        // Validate on blur (for when user leaves field)
        el.addEventListener('blur', function () {
            formFieldsTouched[fieldId] = true;
            validateField(fieldId);
            checkFormValidity();
        });

        // Validate on change (for select elements)
        el.addEventListener('change', function () {
            formFieldsTouched[fieldId] = true;
            validateField(fieldId);
            checkFormValidity();
        });
    });

    // Character counter for message textarea
    var messageField = document.getElementById('contact-message');
    var charCountEl = document.getElementById('char-count');
    if (messageField && charCountEl) {
        messageField.addEventListener('input', function () {
            charCountEl.textContent = this.value.length;
            if (this.value.length > 450) {
                charCountEl.classList.add('text-red-500');
                charCountEl.classList.remove('text-gray-400');
            } else {
                charCountEl.classList.remove('text-red-500');
                charCountEl.classList.add('text-gray-400');
            }
        });
    }


    // ==========================================
    // 7. SET MIN DATE FOR DATE INPUT (TODAY)
    // ==========================================
    var dateInput = document.getElementById('contact-date');
    if (dateInput) {
        var today = new Date();
        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var day = String(today.getDate()).padStart(2, '0');
        dateInput.setAttribute('min', year + '-' + month + '-' + day);
    }


    // ==========================================
    // 8. FORM SUBMISSION HANDLER
    // ==========================================
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate all fields
            var allValid = true;
            Object.keys(fieldConfig).forEach(function (fieldId) {
                var result = validateField(fieldId);
                if (!result) {
                    allValid = false;
                }
            });

            if (!allValid) return;

            // Simulate submission
            var submitBtn = document.getElementById('contact-submit');
            var originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
            submitBtn.disabled = true;

            setTimeout(function () {
                // Show success toast
                showToast('Mensaje enviado correctamente', 'success');

                // Reset form
                contactForm.reset();

                // Reset all field states
                Object.keys(fieldConfig).forEach(function (fieldId) {
                    var fieldGroup = document.getElementById(fieldId).closest('.form-group');
                    resetFieldState(fieldGroup);
                });

                // Reset char counter
                if (charCountEl) {
                    charCountEl.textContent = '0';
                    charCountEl.classList.remove('text-red-500');
                    charCountEl.classList.add('text-gray-400');
                }

                // Reset touched state
                Object.keys(formFieldsTouched).forEach(function (key) {
                    delete formFieldsTouched[key];
                });

                // Restore button
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = true;
            }, 1500);
        });
    }


    // ==========================================
    // 9. TOAST NOTIFICATION
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

        // Trigger animation
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

    // Make showToast globally available for app.js if needed
    window.showToast = showToast;


    // ==========================================
    // 10. FAQ ACCORDION
    // ==========================================
    var faqToggles = document.querySelectorAll('.faq-toggle');
    if (faqToggles.length) {
        faqToggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var faqItem = this.closest('.faq-item');
                var content = faqItem.querySelector('.faq-content');
                var icon = this.querySelector('i');
                var isOpen = this.getAttribute('aria-expanded') === 'true';

                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(function (otherItem) {
                    if (otherItem !== faqItem) {
                        var otherContent = otherItem.querySelector('.faq-content');
                        var otherIcon = otherItem.querySelector('.faq-toggle i');
                        var otherToggle = otherItem.querySelector('.faq-toggle');

                        otherContent.style.maxHeight = null;
                        otherIcon.style.transform = 'rotate(0deg)';
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                if (isOpen) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }


    // ==========================================
    // 11. SCROLL REVEAL ANIMATIONS
    // ==========================================
    var revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

});