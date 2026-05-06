/* ============================================
   AutoElite - Taller Automotriz
   Archivo JavaScript Principal (app.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDarkMode();
  initScrollReveal();
  initCounters();
  initNavbarScroll();
  initSmoothScroll();
  initTypingEffect();
  initCurrentYear();
  initFormValidation();
  initCarousel();

  window.showToast = showToast;
  window.debounce = debounce;
  window.formatCurrency = formatCurrency;
  window.isValidEmail = isValidEmail;
  window.generateId = generateId;
});


// ============================================
// 1. MENU MOVIL
// ============================================
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const closeBtn = document.getElementById('menu-close');
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!menuBtn || !mobileMenu) {
    return;
  }

  const menuPanel = mobileMenu.querySelector('.mobile-menu-panel');

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    if (menuPanel) {
      menuPanel.classList.remove('translate-x-full');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (menuPanel) {
      menuPanel.classList.add('translate-x-full');
    }
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}


// ============================================
// 2. DARK MODE
// ============================================
function initDarkMode() {
  const darkModeBtn = document.getElementById('dark-mode-btn');
  let isDarkMode = localStorage.getItem('darkMode') === 'true';

  function applyDarkMode(enable) {
    const htmlElement = document.documentElement;
    if (enable) {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', enable ? 'true' : 'false');
    isDarkMode = enable;
  }

  applyDarkMode(isDarkMode);

  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      applyDarkMode(isDarkMode);
      showToast(isDarkMode ? 'Modo oscuro activado' : 'Modo claro activado', 'info');
    });
  }
}


// ============================================
// 3. SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}


// ============================================
// 4. CONTADORES ANIMADOS
// ============================================
function initCounters() {
  const counterElements = document.querySelectorAll('[data-target]');
  if (counterElements.length === 0) return;

  function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counterInterval);
      }
      element.textContent = Math.floor(start).toLocaleString('es-PE');
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        const durationAttr = entry.target.getAttribute('data-duration');
        const duration = durationAttr ? parseInt(durationAttr, 10) : 2000;
        if (!isNaN(target) && target > 0) {
          animateCounter(entry.target, target, duration);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(element => {
    counterObserver.observe(element);
  });
}


// ============================================
// 5. NAVBAR SCROLL
// ============================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', debounce(handleScroll, 10));
  handleScroll();
}


// ============================================
// 6. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}


// ============================================
// 7. TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const titles = { success: 'Éxito', error: 'Error', info: 'Información' };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || icons.info}</span>
    <div class="toast__content">
      <div class="toast__title">${titles[type] || titles.info}</div>
      <div class="toast__message">${message}</div>
    </div>
    <button class="toast__close" aria-label="Cerrar notificación">&times;</button>
    <div class="toast__progress" style="animation-duration: ${duration}ms"></div>
  `;

  const closeBtn = toast.querySelector('.toast__close');
  closeBtn.addEventListener('click', () => { removeToast(toast); });

  container.appendChild(toast);

  const timeoutId = setTimeout(() => { removeToast(toast); }, duration);
  toast._timeoutId = timeoutId;
}

function removeToast(toastElement) {
  if (toastElement._timeoutId) { clearTimeout(toastElement._timeoutId); }
  toastElement.classList.add('removing');
  setTimeout(() => {
    if (toastElement.parentNode) { toastElement.parentNode.removeChild(toastElement); }
  }, 400);
}


// ============================================
// 8. TYPING EFFECT
// ============================================
function initTypingEffect() {
  const typingElement = document.querySelector('[data-typing]');
  if (!typingElement) return;

  const fullText = typingElement.getAttribute('data-typing');
  const speedAttr = typingElement.getAttribute('data-typing-speed');
  const speed = speedAttr ? parseInt(speedAttr, 10) : 80;

  function typeWriter(element, text, index) {
    if (index < text.length) {
      element.innerHTML = text.substring(0, index + 1) + '<span class="typing-cursor"></span>';
      setTimeout(() => { typeWriter(element, text, index + 1); }, speed);
    } else {
      element.innerHTML = text + '<span class="typing-cursor"></span>';
    }
  }

  typeWriter(typingElement, fullText, 0);
}


// ============================================
// 9. CURRENT YEAR
// ============================================
function initCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  const lastUpdate = document.getElementById('last-update');
  if (lastUpdate) {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    lastUpdate.textContent = fecha.toLocaleDateString('es-PE', opciones);
  }
}


// ============================================
// 10. FORM VALIDATION
// ============================================
function initFormValidation() {
  const forms = document.querySelectorAll('.form-validate');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => { validateField(input); });
      input.addEventListener('blur', () => { validateField(input); });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let allValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) { allValid = false; }
      });
      if (allValid) {
        const formData = {};
        inputs.forEach(input => {
          const name = input.getAttribute('name');
          const value = input.value.trim();
          if (name) { formData[name] = value; }
        });
        console.log('Datos del formulario:', formData);
        showToast('Formulario enviado correctamente', 'success');
        form.reset();
        inputs.forEach(input => { input.classList.remove('valid', 'invalid'); });
      } else {
        showToast('Por favor, completa todos los campos correctamente', 'error');
      }
    });
  });
}

function validateField(input) {
  const type = input.getAttribute('data-validate');
  const value = input.value.trim();
  if (!type) return true;

  let isValid = false;
  switch (type) {
    case 'required': isValid = value.length > 0; break;
    case 'email': isValid = isValidEmail(value); break;
    case 'phone':
      const cleanPhone = value.replace(/[\s\-\(\)\+]/g, '');
      isValid = cleanPhone.length >= 9 && /^\d+$/.test(cleanPhone);
      break;
    case 'name': isValid = value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value); break;
    case 'plate': isValid = /^[A-Z]{3}-\d{3}$/.test(value.toUpperCase()); break;
    case 'min-length':
      const minLength = parseInt(input.getAttribute('data-min') || '3', 10);
      isValid = value.length >= minLength;
      break;
    default: isValid = true; break;
  }

  if (value.length === 0 && type !== 'required') {
    input.classList.remove('valid', 'invalid');
  } else if (isValid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
  }
  return isValid;
}


// ============================================
// 11. CAROUSEL
// ============================================
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsContainer = carousel.querySelector('.carousel__dots');
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval = null;

    function goToSlide(index) {
      currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      const translateX = -(currentIndex * 100);
      track.style.transform = `translateX(${translateX}%)`;
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.carousel__dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) { dot.classList.add('active'); }
        else { dot.classList.remove('active'); }
      });
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel__dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
        dot.addEventListener('click', ((index) => { return () => { goToSlide(index); resetAutoPlay(); }; })(i));
        dotsContainer.appendChild(dot);
      }
    }

    function startAutoPlay() { stopAutoPlay(); autoPlayInterval = setInterval(() => { goToSlide(currentIndex + 1); }, 5000); }
    function stopAutoPlay() { if (autoPlayInterval !== null) { clearInterval(autoPlayInterval); autoPlayInterval = null; } }
    function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

    if (prevBtn) { prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); resetAutoPlay(); }); }
    if (nextBtn) { nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); resetAutoPlay(); }); }
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    let touchStartX = 0;
    carousel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0].screenX;
      const difference = touchStartX - touchEndX;
      if (Math.abs(difference) > 50) {
        if (difference > 0) { goToSlide(currentIndex + 1); }
        else { goToSlide(currentIndex - 1); }
        resetAutoPlay();
      }
    }, { passive: true });

    createDots();
    goToSlide(0);
    startAutoPlay();
  });
}


// ============================================
// UTILIDADES
// ============================================
function debounce(func, delay) {
  let timeoutId = null;
  return function (...args) {
    if (timeoutId !== null) { clearTimeout(timeoutId); }
    timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
  };
}

function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'S/ 0.00';
  const formatted = Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = amount < 0 ? '-' : '';
  return `${sign}S/ ${formatted}`;
}

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const cleanEmail = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleanEmail);
}

function generateId(prefix) {
  const pref = prefix || 'ae';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${pref}_${timestamp}_${random}`;
}

function filterGallery(category, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const items = container.querySelectorAll('[data-category]');
  const itemsArray = Array.from(items);
  itemsArray.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.style.display = '';
      item.style.opacity = '0';
      item.style.transform = 'scale(0.9)';
      setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
    } else {
      item.style.display = 'none';
    }
  });
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    const btnCategory = btn.getAttribute('data-filter');
    if (btnCategory === category) { btn.classList.add('active'); }
    else { btn.classList.remove('active'); }
  });
}

window.filterGallery = filterGallery;
