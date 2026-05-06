/* ============================================
   AutoElite - Taller Automotriz
   Archivo JavaScript Principal (app.js)
   Se carga en TODAS las páginas
   Autor: AutoElite Dev Team
   ============================================ */

// ============================================
// Esperar a que el DOM esté completamente cargado
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todos los módulos
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

  // Registrar utilidades globalmente
  window.showToast = showToast;
  window.debounce = debounce;
  window.formatCurrency = formatCurrency;
  window.isValidEmail = isValidEmail;
  window.generateId = generateId;
});


// ============================================
// 1. MENÚ MÓVIL (Toggle)
// Demuestra: Variables, DOM, Eventos, classList
// ============================================
function initMobileMenu() {
  // Variables y referencias al DOM
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const menuLinks = document.querySelectorAll('.mobile-menu__links a');

  // Condición de seguridad: si no existen los elementos, salir
  if (!menuBtn || !mobileMenu) {
    return;
  }

  // Función para abrir el menú
  function openMenu() {
    menuBtn.classList.add('active');
    mobileMenu.classList.add('open');
    if (overlay) {
      overlay.classList.add('active');
    }
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar el menú
  function closeMenu() {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('open');
    if (overlay) {
      overlay.classList.remove('active');
    }
    // Restaurar scroll del body
    document.body.style.overflow = '';
  }

  // Evento: click en el botón hamburguesa (toggle)
  menuBtn.addEventListener('click', () => {
    // Usar operador ternario: si tiene la clase 'active', cerrar; sino, abrir
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Evento: click en el overlay para cerrar
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Evento: cerrar menú al hacer click en cualquier enlace
  // Usamos forEach para iterar sobre la NodeList
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Evento: cerrar menú con la tecla Escape
  document.addEventListener('keydown', (event) => {
    // Condición: si la tecla es Escape y el menú está abierto
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}


// ============================================
// 2. DARK MODE con localStorage
// Demuestra: Variables (let, const), Operadores lógicos,
//             Condicionales, localStorage, DOM
// ============================================
function initDarkMode() {
  // Referencia al botón de dark mode
  const darkModeBtn = document.getElementById('dark-mode-btn');

  // Variable let porque puede cambiar
  let isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Función para aplicar el modo oscuro
  function applyDarkMode(enable) {
    const htmlElement = document.documentElement; // <html>

    // Condición: si se debe habilitar
    if (enable) {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }

    // Guardar preferencia en localStorage usando operador ternario
    localStorage.setItem('darkMode', enable ? 'true' : 'false');
    isDarkMode = enable;
  }

  // Aplicar modo oscuro al cargar si estaba guardado
  applyDarkMode(isDarkMode);

  // Si existe el botón, agregar evento click
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      // Negar el estado actual con operador lógico NOT (!)
      isDarkMode = !isDarkMode;
      applyDarkMode(isDarkMode);

      // Mostrar notificación toast
      const mensaje = isDarkMode ? 'Modo oscuro activado' : 'Modo claro activado';
      showToast(mensaje, 'info');
    });
  }
}


// ============================================
// 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
// Demuestra: Objetos, Arrow functions, DOM, classList
// ============================================
function initScrollReveal() {
  // Opciones del observador (objeto con propiedades)
  const observerOptions = {
    root: null,           // Usar el viewport como contenedor
    rootMargin: '0px',    // Sin margen
    threshold: 0.15       // Se activa cuando 15% del elemento es visible
  };

  // Crear el Intersection Observer con callback (arrow function)
  const revealObserver = new IntersectionObserver((entries) => {
    // Iterar sobre cada entrada con forEach
    entries.forEach(entry => {
      // Condición: si el elemento está intersectando (es visible)
      if (entry.isIntersecting) {
        // Agregar la clase 'revealed' para activar la animación CSS
        entry.target.classList.add('revealed');
        // Dejar de observar el elemento (optimización)
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Seleccionar todos los elementos con la clase .reveal
  const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');

  // Iterar y observar cada elemento
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}


// ============================================
// 4. CONTADORES ANIMADOS
// Demuestra: Funciones, setInterval, Math, Strings,
//             Operadores aritméticos (+, -, /), Condicionales
// ============================================
function initCounters() {
  // Seleccionar todos los elementos con la clase .counter__number
  const counterElements = document.querySelectorAll('[data-target]');

  // Si no hay contadores, salir de la función
  if (counterElements.length === 0) {
    return;
  }

  // Función principal para animar un contador
  // Parámetros: element (DOM), target (number), duration (number en ms)
  function animateCounter(element, target, duration) {
    // Variable let porque cambia en cada intervalo
    let start = 0;

    // Calcular el incremento por cada frame (aprox. 16ms = 60fps)
    // Uso de operador división (/)
    const increment = target / (duration / 16);

    // Crear un intervalo con setInterval
    // Retorna un ID que podemos usar con clearInterval
    const counterInterval = setInterval(() => {
      // Sumar el incremento al valor actual (operador +)
      start += increment;

      // Condición: si llegamos o pasamos el objetivo
      if (start >= target) {
        start = target; // Asegurar que no pase del target
        clearInterval(counterInterval); // Detener el intervalo
      }

      // Formatear el número con separadores de miles (locale es-PE)
      // Usar Math.floor() para redondear hacia abajo
      const formattedNumber = Math.floor(start).toLocaleString('es-PE');

      // Actualizar el texto del elemento DOM
      element.textContent = formattedNumber;
    }, 16);
  }

  // Usar Intersection Observer para activar cuando sea visible
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Obtener el valor objetivo del atributo data-target
        const target = parseInt(entry.target.getAttribute('data-target'), 10);

        // Obtener la duración del atributo data-duration, o usar 2000ms por defecto
        const durationAttr = entry.target.getAttribute('data-duration');
        const duration = durationAttr ? parseInt(durationAttr, 10) : 2000;

        // Verificar que el target sea un número válido con isNaN
        if (!isNaN(target) && target > 0) {
          animateCounter(entry.target, target, duration);
        }

        // Dejar de observar después de activar
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Activar cuando 50% sea visible

  // Observar cada elemento contador
  counterElements.forEach(element => {
    counterObserver.observe(element);
  });
}


// ============================================
// 5. NAVBAR SCROLL EFFECT
// Demuestra: window, Eventos (scroll), Condicionales (if),
//             Operadores de comparación (>)
// ============================================
function initNavbarScroll() {
  // Variable const para el navbar
  const navbar = document.querySelector('.navbar');

  // Condición de seguridad
  if (!navbar) {
    return;
  }

  // Función que se ejecuta en cada scroll
  // Usamos window.scrollY para obtener los píxeles desplazados
  function handleScroll() {
    // Condición: si el scroll es mayor a 50 píxeles
    if (window.scrollY > 50) {
      // Agregar clase que aplica sombra y fondo
      navbar.classList.add('scrolled');
    } else {
      // Quitar la clase cuando estamos arriba
      navbar.classList.remove('scrolled');
    }
  }

  // Agregar event listener al scroll de la ventana
  // Usamos la función debounce para no saturar el rendimiento
  window.addEventListener('scroll', debounce(handleScroll, 10));

  // Ejecutar una vez al cargar para verificar estado inicial
  handleScroll();
}


// ============================================
// 6. SMOOTH SCROLL para enlaces ancla
// Demuestra: querySelectorAll, forEach, Eventos,
//             Métodos de String (startsWith), preventDefault
// ============================================
function initSmoothScroll() {
  // Seleccionar todos los enlaces que comienzan con "#"
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  // Iterar sobre cada enlace con forEach
  anchorLinks.forEach(anchor => {
    // Agregar evento click
    anchor.addEventListener('click', (event) => {
      // Prevenir comportamiento por defecto (salto brusco)
      event.preventDefault();

      // Obtener el valor del href usando getAttribute
      const href = anchor.getAttribute('href');

      // Condición: si el href es solo "#" o está vacío, no hacer nada
      if (href === '#' || href === '') {
        return;
      }

      // Buscar el elemento destino en el DOM
      const targetElement = document.querySelector(href);

      // Si el elemento existe, hacer scroll suave
      if (targetElement) {
        // Calcular offset considerando la altura del navbar
        const navbarHeight = document.querySelector('.navbar')
          ? document.querySelector('.navbar').offsetHeight
          : 0;

        // Calcular la posición final restando la altura del navbar
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;

        // Usar scrollTo para mayor compatibilidad
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}


// ============================================
// 7. TOAST NOTIFICATION SYSTEM
// Demuestra: createElement, classList, appendChild,
//             Template literals, setTimeout, Strings
// ============================================
function showToast(message, type = 'info', duration = 3000) {
  // --- Tipos de datos: String, Object, Number ---
  // type: string ('success', 'error', 'info')
  // duration: number (milisegundos)

  // Buscar o crear el contenedor de toasts
  let container = document.querySelector('.toast-container');

  // Condición: si no existe el contenedor, crearlo
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    // Usar appendChild para agregar al body
    document.body.appendChild(container);
  }

  // Objeto con iconos para cada tipo de toast
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  // Objeto con títulos para cada tipo
  const titles = {
    success: 'Éxito',
    error: 'Error',
    info: 'Información'
  };

  // Crear el elemento del toast usando createElement
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;

  // Usar template literals para construir el HTML del toast
  // Esto demuestra: template literals, propiedades de objeto
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || icons.info}</span>
    <div class="toast__content">
      <div class="toast__title">${titles[type] || titles.info}</div>
      <div class="toast__message">${message}</div>
    </div>
    <button class="toast__close" aria-label="Cerrar notificación">&times;</button>
    <div class="toast__progress" style="animation-duration: ${duration}ms"></div>
  `;

  // Agregar evento click al botón de cerrar
  const closeBtn = toast.querySelector('.toast__close');
  closeBtn.addEventListener('click', () => {
    removeToast(toast);
  });

  // Agregar el toast al contenedor
  container.appendChild(toast);

  // Programar la remoción automática con setTimeout
  // La función removeToast se ejecuta después de 'duration' milisegundos
  const timeoutId = setTimeout(() => {
    removeToast(toast);
  }, duration);

  // Guardar el ID del timeout para poder cancelarlo si se cierra manualmente
  toast._timeoutId = timeoutId;
}

// Función auxiliar para remover un toast con animación
function removeToast(toastElement) {
  // Cancelar el setTimeout pendiente si existe
  if (toastElement._timeoutId) {
    clearTimeout(toastElement._timeoutId);
  }

  // Agregar clase para animación de salida
  toastElement.classList.add('removing');

  // Esperar a que termine la animación y luego remover del DOM
  setTimeout(() => {
    // Verificar que el elemento tenga un padre antes de remover
    if (toastElement.parentNode) {
      toastElement.parentNode.removeChild(toastElement);
    }
  }, 400);
}


// ============================================
// 8. TYPING EFFECT (Efecto de escritura para hero)
// Demuestra: charAt(), substring(), setTimeout recursivo,
//             String, Condicionales
// ============================================
function initTypingEffect() {
  // Buscar el elemento donde se aplicará el efecto
  const typingElement = document.querySelector('[data-typing]');

  // Condición de seguridad: si no existe, salir
  if (!typingElement) {
    return;
  }

  // Obtener el texto del atributo data-typing
  const fullText = typingElement.getAttribute('data-typing');

  // Velocidad de escritura en milisegundos (puede venir de data-attribute)
  const speedAttr = typingElement.getAttribute('data-typing-speed');
  const speed = speedAttr ? parseInt(speedAttr, 10) : 80;

  // Función typeWriter: escribe un carácter a la vez
  // Parámetros: element (DOM), text (string), speed (number)
  function typeWriter(element, text, index) {
    // Condición base: si el índice es menor que la longitud del texto
    if (index < text.length) {
      // Usar substring() para obtener el texto hasta el índice actual
      // Y agregar el cursor parpadeante
      element.innerHTML = text.substring(0, index + 1) + '<span class="typing-cursor"></span>';

      // Llamar recursivamente con setTimeout (incrementar índice con operador +)
      setTimeout(() => {
        typeWriter(element, text, index + 1);
      }, speed);
    } else {
      // Cuando termina de escribir, mantener el cursor parpadeante
      element.innerHTML = text + '<span class="typing-cursor"></span>';
    }
  }

  // Iniciar el efecto de escritura
  typeWriter(typingElement, fullText, 0);
}


// ============================================
// 9. CURRENT YEAR EN FOOTER
// Demuestra: Date object, textContent, getElementById,
//             Condicionales (if)
// ============================================
function initCurrentYear() {
  // Buscar el span donde se muestra el año actual
  const yearSpan = document.getElementById('current-year');

  // Condición: si existe el elemento, actualizar su contenido
  if (yearSpan) {
    // Crear un objeto Date y obtener el año con getFullYear()
    const currentYear = new Date().getFullYear();

    // Asignar el año como texto (número convertido a string automáticamente)
    yearSpan.textContent = currentYear;
  }

  // También buscar la fecha de "última actualización" si existe
  const lastUpdate = document.getElementById('last-update');
  if (lastUpdate) {
    const fecha = new Date();
    // Usar toLocaleDateString para formatear en español
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    lastUpdate.textContent = fecha.toLocaleDateString('es-PE', opciones);
  }
}


// ============================================
// 10. FORM VALIDATION
// Demuestra: Eventos (input, submit), Regex, DOM,
//             Condicionales, Strings (trim, length)
// ============================================
function initFormValidation() {
  // Seleccionar todos los formularios con la clase .form-validate
  const forms = document.querySelectorAll('.form-validate');

  // Iterar sobre cada formulario
  forms.forEach(form => {
    // Seleccionar todos los inputs y textareas del formulario
    const inputs = form.querySelectorAll('.form-input, .form-textarea');

    // Agregar evento 'input' a cada campo para validación en tiempo real
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateField(input);
      });

      // También validar cuando el campo pierde el foco (blur)
      input.addEventListener('blur', () => {
        validateField(input);
      });
    });

    // Evento submit del formulario
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevenir envío por defecto

      // Variable para rastrear si todos los campos son válidos
      let allValid = true;

      // Validar cada campo
      inputs.forEach(input => {
        // Si validateField retorna false, marcar como inválido
        if (!validateField(input)) {
          allValid = false;
        }
      });

      // Condición: si todos los campos son válidos
      if (allValid) {
        // Recopilar los datos del formulario en un objeto
        const formData = {};
        inputs.forEach(input => {
          // Usar el atributo 'name' como clave y el valor como valor
          const name = input.getAttribute('name');
          const value = input.value.trim(); // Usar trim() para quitar espacios
          if (name) {
            formData[name] = value;
          }
        });

        // Mostrar los datos en consola (para depuración)
        console.log('Datos del formulario:', formData);

        // Mostrar toast de éxito
        showToast('Formulario enviado correctamente', 'success');

        // Resetear el formulario
        form.reset();

        // Quitar clases de validación
        inputs.forEach(input => {
          input.classList.remove('valid', 'invalid');
        });
      } else {
        // Mostrar toast de error
        showToast('Por favor, completa todos los campos correctamente', 'error');
      }
    });
  });
}

// Función para validar un campo individual
// Retorna true si es válido, false si no
function validateField(input) {
  // Obtener el tipo de validación requerido
  const type = input.getAttribute('data-validate');
  const value = input.value.trim(); // String: usar trim() para eliminar espacios

  // Si no hay tipo de validación o el campo está vacío y no es requerido
  if (!type) {
    return true;
  }

  // Variable booleana para el resultado
  let isValid = false;

  // Usar switch para diferentes tipos de validación
  switch (type) {
    case 'required':
      // Verificar que el campo no esté vacío (length > 0)
      isValid = value.length > 0;
      break;

    case 'email':
      // Validar con regex usando la función isValidEmail
      isValid = isValidEmail(value);
      break;

    case 'phone':
      // Validar número de teléfono (mínimo 9 dígitos)
      // Limpiar el string con replace() y una expresión regular
      const cleanPhone = value.replace(/[\s\-\(\)\+]/g, '');
      isValid = cleanPhone.length >= 9 && /^\d+$/.test(cleanPhone);
      break;

    case 'name':
      // Validar nombre (solo letras y espacios, mínimo 2 caracteres)
      isValid = value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value);
      break;

    case 'plate':
      // Validar placa de vehículo peruana (formato: ABC-123 o ABC-12D)
      isValid = /^[A-Z]{3}-\d{3}$/.test(value.toUpperCase());
      break;

    case 'min-length':
      // Obtener el mínimo del atributo data-min
      const minLength = parseInt(input.getAttribute('data-min') || '3', 10);
      isValid = value.length >= minLength;
      break;

    default:
      isValid = true;
      break;
  }

  // Aplicar clases de validación según el resultado
  if (value.length === 0 && type !== 'required') {
    // Si está vacío y no es requerido, dejar neutral
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
// 11. CAROUSEL / SLIDER
// Demuestra: Variables, Array, indexOf, Eventos,
//             Condicionales, Operadores (++, --, %)
// ============================================
function initCarousel() {
  // Seleccionar todos los carouseles de la página
  const carousels = document.querySelectorAll('.carousel');

  // Iterar sobre cada carousel
  carousels.forEach(carousel => {
    // Variables del carousel
    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsContainer = carousel.querySelector('.carousel__dots');

    // Condición de seguridad: si no hay track ni slides, salir
    if (!track || slides.length === 0) {
      return;
    }

    // Variables de estado
    let currentIndex = 0; // Índice actual (let porque cambia)
    const totalSlides = slides.length; // Total de slides (const porque no cambia)
    let autoPlayInterval = null; // ID del intervalo para autoplay

    // Función para mover a un slide específico
    function goToSlide(index) {
      // Asegurar que el índice esté dentro del rango usando operador módulo (%)
      currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;

      // Calcular la traslación usando el ancho de cada slide
      // currentIndex * 100% para mover el track
      const translateX = -(currentIndex * 100);
      track.style.transform = `translateX(${translateX}%)`;

      // Actualizar los dots (indicadores)
      updateDots();
    }

    // Función para crear y actualizar los dots
    function updateDots() {
      // Si no existe el contenedor de dots, crearlo
      if (!dotsContainer) {
        return;
      }

      // Seleccionar todos los dots existentes
      const dots = dotsContainer.querySelectorAll('.carousel__dot');

      // Actualizar la clase active en cada dot
      dots.forEach((dot, index) => {
        // Condición: si el índice coincide con el actual
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Función para crear los dots dinámicamente
    function createDots() {
      if (!dotsContainer) {
        return;
      }

      // Limpiar dots existentes
      dotsContainer.innerHTML = '';

      // Crear un dot por cada slide usando un bucle for
      for (let i = 0; i < totalSlides; i++) {
        // createElement para crear un botón
        const dot = document.createElement('button');
        dot.className = `carousel__dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);

        // Usar una IIFE (Immediately Invoked Function Expression) con closure
        // para capturar el valor correcto de i en cada iteración
        dot.addEventListener('click', ((index) => {
          return () => {
            goToSlide(index);
            resetAutoPlay();
          };
        })(i));

        // Agregar el dot al contenedor
        dotsContainer.appendChild(dot);
      }
    }

    // Función de autoplay
    function startAutoPlay() {
      // Detener cualquier autoplay existente
      stopAutoPlay();

      // Iniciar nuevo intervalo (cada 5 segundos)
      autoPlayInterval = setInterval(() => {
        // Incrementar el índice con operador ++
        goToSlide(currentIndex + 1);
      }, 5000);
    }

    // Función para detener autoplay
    function stopAutoPlay() {
      if (autoPlayInterval !== null) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    // Función para reiniciar autoplay
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Evento: botón anterior
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        // Decrementar el índice con operador --
        goToSlide(currentIndex - 1);
        resetAutoPlay();
      });
    }

    // Evento: botón siguiente
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
      });
    }

    // Evento: pausar autoplay al pasar el mouse
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Evento: swipe en dispositivos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
      touchEndX = event.changedTouches[0].screenX;
      const difference = touchStartX - touchEndX;

      // Si el deslizamiento es mayor a 50px, cambiar slide
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          goToSlide(currentIndex + 1); // Deslizó a la izquierda
        } else {
          goToSlide(currentIndex - 1); // Deslizó a la derecha
        }
        resetAutoPlay();
      }
    }, { passive: true });

    // Inicializar
    createDots();
    goToSlide(0);
    startAutoPlay();
  });
}


// ============================================
// FUNCIONES UTILITARIAS
// Demuestra: Funciones (declaraciones, expressions, arrow),
//             Strings, Arrays, Objects, Operadores
// ============================================

/**
 * Debounce: Retrasa la ejecución de una función hasta que
 * dejen de llamarla durante un tiempo determinado.
 * Útil para eventos como 'scroll' o 'input' que se disparan frecuentemente.
 *
 * @param {Function} func - Función a retrasar
 * @param {number} delay - Tiempo de espera en milisegundos
 * @returns {Function} - Función debounced
 *
 * Demuestra: Funciones (expression), Closure, setTimeout, clearTimeout
 */
function debounce(func, delay) {
  // Variable para almacenar el ID del timeout (closure)
  let timeoutId = null;

  // Retornar una función que envuelve la original (closure)
  return function (...args) {
    // Limpiar el timeout anterior si existe
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Crear un nuevo timeout
    timeoutId = setTimeout(() => {
      // Ejecutar la función original con los argumentos
      // apply() para pasar el contexto y los argumentos
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Formatea una cantidad numérica como moneda peruana (S/).
 *
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cadena formateada como moneda
 *
 * Demuestra: toFixed(), Template literals, Operador ternario
 */
function formatCurrency(amount) {
  // Verificar que amount sea un número válido con isNaN() y typeof
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'S/ 0.00';
  }

  // Usar toFixed(2) para siempre mostrar 2 decimales
  // toLocaleString para separadores de miles
  const formatted = Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Operador ternario para el signo negativo
  const sign = amount < 0 ? '-' : '';

  // Template literal para construir el resultado
  return `${sign}S/ ${formatted}`;
}

/**
 * Valida si un email tiene un formato correcto usando Regex.
 *
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido, false si no
 *
 * Demuestra: RegExp, test(), trim(), String methods
 */
function isValidEmail(email) {
  // Condición: verificar que email sea un string
  if (typeof email !== 'string') {
    return false;
  }

  // Usar trim() para quitar espacios en blanco al inicio y final
  const cleanEmail = email.trim();

  // Expresión regular para validar email
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  // Usar test() del objeto RegExp para verificar
  return emailRegex.test(cleanEmail);
}

/**
 * Genera un ID único combinando timestamp y un string aleatorio.
 *
 * @param {string} prefix - Prefijo opcional para el ID
 * @returns {string} - ID único
 *
 * Demuestra: Date, Math.random(), toString(), String methods
 */
function generateId(prefix) {
  // Valor por defecto si no se proporciona prefix
  const pref = prefix || 'ae';

  // Obtener timestamp actual (number)
  const timestamp = Date.now();

  // Generar un string aleatorio usando Math.random()
  const random = Math.random().toString(36).substring(2, 8);

  // Combinar todo con template literal
  return `${pref}_${timestamp}_${random}`;
}

/**
 * Función adicional: Filtrar elementos de una galería por categoría.
 * Demuestra: Array methods (filter, forEach), DOM manipulation, Strings
 *
 * @param {string} category - Categoría a filtrar
 * @param {string} containerSelector - Selector del contenedor de items
 */
function filterGallery(category, containerSelector) {
  // Seleccionar el contenedor
  const container = document.querySelector(containerSelector);

  // Condición de seguridad
  if (!container) {
    return;
  }

  // Seleccionar todos los items de la galería
  const items = container.querySelectorAll('[data-category]');

  // Convertir NodeList a Array para usar filter
  const itemsArray = Array.from(items);

  // Filtrar: si category es 'all', mostrar todo; sino, coincidir categoría
  itemsArray.forEach(item => {
    const itemCategory = item.getAttribute('data-category');

    // Condición: mostrar si es 'all' o si la categoría coincide (usando includes)
    if (category === 'all' || itemCategory === category) {
      item.style.display = '';
      // Agregar animación de aparición
      item.style.opacity = '0';
      item.style.transform = 'scale(0.9)';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, 50);
    } else {
      item.style.display = 'none';
    }
  });

  // Actualizar botones activos de filtro
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    const btnCategory = btn.getAttribute('data-filter');
    if (btnCategory === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Registrar filterGallery globalmente
window.filterGallery = filterGallery;


// ============================================
// EJEMPLOS ADICIONALES CONCEPTOS JS
// (Comentados para referencia educativa)
// ============================================

/*
// === VARIABLES Y TIPOS DE DATOS ===

// Variables con const (no se reasignan)
const nombreEmpresa = 'AutoElite';         // String
const anioFundacion = 2015;                 // Number
const estaActivo = true;                     // Boolean
const servicios = ['Mecánica', 'Electricidad', 'Pintura']; // Array
const empresa = {                            // Object
  nombre: 'AutoElite',
  ubicacion: 'Lima, Perú',
  calificacion: 4.8,
  servicios: ['Mecánica', 'Electricidad', 'Pintura'],
  mostrarInfo: function() {
    return `${this.nombre} - ${this.ubicacion}`;
  }
};

// Variables con let (se pueden reasignar)
let contadorVisitas = 0;
contadorVisitas = contadorVisitas + 1; // Operador +
contadorVisitas += 5;                  // Operador de asignación compuesta


// === OPERADORES ===

// Aritméticos
const suma = 10 + 5;          // 15
const resta = 10 - 5;         // 5
const multiplicacion = 10 * 5; // 50
const division = 10 / 3;       // 3.333...
const modulo = 10 % 3;         // 1 (residuo)
const exponente = 2 ** 3;      // 8

// Comparación
console.log(5 === '5');        // false (estricto: tipo + valor)
console.log(5 == '5');         // true (flexible: solo valor)
console.log(5 !== '5');        // true (estricto diferente)
console.log(5 > 3);            // true
console.log(5 <= 5);           // true

// Lógicos
const tieneCita = true;
const tieneAuto = false;
console.log(tieneCita && tieneAuto);   // false (AND)
console.log(tieneCita || tieneAuto);   // true  (OR)
console.log(!tieneCita);               // false (NOT)

// Ternario
const edad = 18;
const esMayor = edad >= 18 ? 'Mayor de edad' : 'Menor de edad';


// === CONDICIONALES ===

// if / else if / else
const dia = 'lunes';
if (dia === 'sábado' || dia === 'domingo') {
  console.log('Fin de semana');
} else if (dia === 'viernes') {
  console.log('¡Viernes!');
} else {
  console.log('Día laboral');
}

// switch
const servicio = 'mecanica';
switch (servicio) {
  case 'mecanica':
    console.log('Servicio de mecánica');
    break;
  case 'pintura':
    console.log('Servicio de pintura');
    break;
  case 'electricidad':
    console.log('Servicio de electricidad');
    break;
  default:
    console.log('Servicio no reconocido');
    break;
}


// === BUCLES ===

// for
for (let i = 0; i < 5; i++) {
  console.log(`Iteración: ${i}`);
}

// forEach (arrays)
servicios.forEach((servicio, index) => {
  console.log(`${index + 1}. ${servicio}`);
});

// while
let intentos = 3;
while (intentos > 0) {
  console.log(`Intentos restantes: ${intentos}`);
  intentos--;
}

// for...of (iterables)
const caracteres = ['A', 'B', 'C'];
for (const letra of caracteres) {
  console.log(letra);
}


// === FUNCIONES ===

// Declaración de función
function sumar(a, b) {
  return a + b;
}

// Expresión de función
const restar = function(a, b) {
  return a - b;
};

// Arrow function
const multiplicar = (a, b) => a * b;

// Callback
function procesarServicio(nombre, callback) {
  console.log(`Procesando: ${nombre}`);
  callback();
}

procesarServicio('Cambio de aceite', () => {
  console.log('Servicio completado');
});


// === ARRAYS (Métodos) ===

const vehiculos = [
  { marca: 'Toyota', modelo: 'Corolla', anio: 2020 },
  { marca: 'Honda', modelo: 'Civic', anio: 2019 },
  { marca: 'Nissan', modelo: 'Sentra', anio: 2021 },
  { marca: 'Toyota', modelo: 'Camry', anio: 2018 }
];

// push: agregar elemento
vehiculos.push({ marca: 'Hyundai', modelo: 'Accent', anio: 2022 });

// filter: filtrar elementos
const toyotas = vehiculos.filter(v => v.marca === 'Toyota');

// map: transformar elementos
const modelos = vehiculos.map(v => `${v.marca} ${v.modelo}`);

// find: buscar el primero que cumpla la condición
const civic = vehiculos.find(v => v.modelo === 'Civic');

// includes: verificar si existe un valor
const marcas = ['Toyota', 'Honda', 'Nissan'];
const tieneToyota = marcas.includes('Toyota'); // true

// sort: ordenar elementos
const numeros = [3, 1, 4, 1, 5];
numeros.sort((a, b) => a - b); // [1, 1, 3, 4, 5]


// === STRINGS (Métodos) ===

const texto = '  AutoElite Taller Automotriz  ';

texto.length;                     // 33 (longitud)
texto.toUpperCase();              // '  AUTOELITE TALLER AUTOMOTRIZ  '
texto.toLowerCase();              // '  autoelite taller automotriz  '
texto.trim();                     // 'AutoElite Taller Automotriz'
texto.includes('Taller');         // true
texto.indexOf('Elite');           // 4
texto.substring(0, 9);            // '  AutoElit'
texto.replace('AutoElite', 'AE'); // '  AE Taller Automotriz  '
texto.split(' ');                 // ['  AutoElite', 'Taller', 'Automotriz  ']

// Template literals
const nombre = 'AutoElite';
const mensaje = `Bienvenido a ${nombre} - Tu taller de confianza`;
*/
