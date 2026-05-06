/* ============================================
   script.js - Lógica principal de index.html
   AutoElite - Taller Automotriz
   ============================================ */

// ============================================
// 1. DATOS DE SERVICIOS (Arreglo de Objetos)
// Demuestra: objetos, arrays, propiedades
// ============================================
const serviciosData = [
    {
        id: 1,
        nombre: "Cambio de Aceite y Filtros",
        precio: 120,
        categoria: "Mantenimiento",
        descripcion: "Servicio completo de cambio de aceite con filtros originales"
    },
    {
        id: 2,
        nombre: "Mantenimiento Preventivo",
        precio: 200,
        categoria: "Mantenimiento",
        descripcion: "Revisión integral de todos los sistemas del vehículo"
    },
    {
        id: 3,
        nombre: "Diagnóstico Electrónico",
        precio: 150,
        categoria: "Diagnóstico",
        descripcion: "Escaneo computarizado para detectar fallas"
    },
    {
        id: 4,
        nombre: "Reparación de Motor",
        precio: 500,
        categoria: "Reparación",
        descripcion: "Reconstrucción y reparación completa del motor"
    },
    {
        id: 5,
        nombre: "Alineación y Balanceo",
        precio: 100,
        categoria: "Mantenimiento",
        descripcion: "Alineación de dirección y balanceo de llantas"
    },
    {
        id: 6,
        nombre: "Tuning Personalizado",
        precio: 800,
        categoria: "Personalización",
        descripcion: "Modificaciones de rendimiento y estética"
    }
];

// ============================================
// 2. DATOS DE TESTIMONIOS (Arreglo de Objetos)
// ============================================
const testimonios = [
    {
        nombre: "Carlos Mendoza",
        vehiculo: "Toyota Corolla 2022",
        rating: 5,
        texto: "Excelente servicio. Llevé mi auto para un mantenimiento preventivo y quedó impecable. El equipo es muy profesional y los precios son justos. Recomiendo totalmente AutoElite.",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
        nombre: "María López",
        vehiculo: "Honda CR-V 2023",
        rating: 5,
        texto: "El diagnóstico electrónico fue muy preciso. Encontraron un problema que otros talleres no detectaron. La atención al cliente es de primera clase. Volveré sin duda.",
        foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
    },
    {
        nombre: "José Ramírez",
        vehiculo: "Nissan Frontier 2021",
        rating: 4,
        texto: "Muy buen taller. Hicieron el cambio de aceite y filtros en tiempo récord. El precio fue transparente sin costos ocultos. El único detalle es que podría tener mejor estacionamiento.",
        foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
    },
    {
        nombre: "Ana García",
        vehiculo: "Kia Sportage 2024",
        rating: 5,
        texto: "Increíble experiencia desde el momento que llegué. Me explicaron todo el proceso de reparación y mantuvieron comunicación constante. Mi auto quedó como nuevo.",
        foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    },
    {
        nombre: "Roberto Sánchez",
        vehiculo: "Mazda 3 2022",
        rating: 5,
        texto: "El mejor taller de Arequipa sin duda. Llevo 3 años como cliente y nunca me han fallado. El tuning que le hicieron a mi Mazda quedó espectacular. 100% recomendado.",
        foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    }
];

// ============================================
// 3. COTIZADOR DE SERVICIOS
// Demuestra: variables, operadores, condicionales,
// funciones, objetos, strings, DOM
// ============================================

/**
 * Función principal del cotizador
 * Calcula el presupuesto basado en servicio y cantidad
 * Demuestra: parseFloat, parseInt, condicionales, operadores
 */
function calcularPresupuesto() {
    // Obtener elementos del DOM
    const selectServicio = document.getElementById("servicio");
    const inputCantidad = document.getElementById("cantidad");
    const divResultado = document.getElementById("resultado");
    const textoResultado = document.getElementById("detalle-cotizacion");

    // Variables: parseFloat convierte string a número decimal
    const precio = parseFloat(selectServicio.value);
    // parseInt convierte string a número entero
    const cantidad = parseInt(inputCantidad.value);

    // Obtener el texto completo de la opción seleccionada
    const opcionSeleccionada = selectServicio.options[selectServicio.selectedIndex];
    const nombreServicio = opcionSeleccionada.text;

    // ---- CONDICIONAL: Validación de datos ----
    // Usa isNaN() para verificar si no es un número
    // Usa operador lógico OR (||)
    if (isNaN(precio) || precio <= 0) {
        mostrarError("Por favor, selecciona un servicio válido.");
        return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarError("Por favor, ingresa una cantidad válida de vehículos.");
        return;
    }

    if (cantidad > 50) {
        mostrarError("Para flotas mayores a 50 vehículos, contáctanos directamente.");
        return;
    }

    // ---- OPERADORES ARITMÉTICOS ----
    // Multiplicación: precio * cantidad
    let subtotal = precio * cantidad;
    let descuento = 0;
    let porcentajeDescuento = 0;
    let descuentoAplicado = false;

    // ---- CONDICIONAL: Descuento por volumen ----
    // Operador >= (mayor o igual)
    if (cantidad >= 3 && cantidad < 10) {
        descuento = subtotal * 0.10; // 10% de descuento
        porcentajeDescuento = 10;
        descuentoAplicado = true;
    } else if (cantidad >= 10) {
        // Operador lógico AND (&&)
        descuento = subtotal * 0.15; // 15% de descuento para flotas grandes
        porcentajeDescuento = 15;
        descuentoAplicado = true;
    }

    // Resta: subtotal - descuento
    let total = subtotal - descuento;

    // Mostrar resultado
    divResultado.style.display = "block";
    divResultado.classList.add("fade-in");

    // ---- TEMPLATE LITERALS (Strings) ----
    // Usa backticks `` para insertar variables con ${}
    let mensaje = `
        <div class="text-left space-y-2">
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Servicio:</span>
                <span class="font-semibold">${extraerNombreServicio(nombreServicio)}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Precio unitario:</span>
                <span class="font-semibold">S/ ${precio.toFixed(2)}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Cantidad:</span>
                <span class="font-semibold">${cantidad} vehículo${cantidad > 1 ? "s" : ""}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Subtotal:</span>
                <span class="font-semibold">S/ ${subtotal.toFixed(2)}</span>
            </div>`;

    // ---- CONDICIONAL: Mostrar descuento ----
    if (descuentoAplicado) {
        mensaje += `
            <div class="flex justify-between py-2 border-b text-green-600">
                <span>Descuento flota (${porcentajeDescuento}%):</span>
                <span class="font-semibold">- S/ ${descuento.toFixed(2)}</span>
            </div>`;
    }

    mensaje += `
            <div class="flex justify-between py-3 text-lg">
                <span class="font-bold text-red-600">TOTAL:</span>
                <span class="font-bold text-red-600 text-xl">S/ ${total.toFixed(2)}</span>
            </div>`;

    // Mensaje adicional según el total
    // ---- SWITCH: Mensaje según rango de precio ----
    mensaje += "<div class='mt-4 p-3 rounded bg-blue-50 text-blue-800 text-sm'>";
    switch (true) {
        case (total <= 200):
            mensaje += "<i class='fas fa-info-circle mr-1'></i> ¡Servicio básico al mejor precio!";
            break;
        case (total <= 500):
            mensaje += "<i class='fas fa-star mr-1'></i> ¡Excelente elección para el mantenimiento de tu vehículo!";
            break;
        case (total <= 1500):
            mensaje += "<i class='fas fa-award mr-1'></i> ¡Servicio premium! Tu vehículo quedará impecable.";
            break;
        default:
            mensaje += "<i class='fas fa-crown mr-1'></i> ¡Servicio VIP! Contáctanos para beneficios exclusivos.";
            break;
    }
    mensaje += "</div>";

    // Cerrar el div principal
    mensaje += "</div>";

    textoResultado.innerHTML = mensaje;
}

/**
 * Extrae solo el nombre del servicio sin el precio
 * Demuestra: métodos de string (split, index)
 */
function extraerNombreServicio(textoCompleto) {
    // String method: split() divide el string en un array
    const partes = textoCompleto.split("(");
    // Devolver la primera parte (el nombre)
    return partes[0].trim();
}

/**
 * Muestra un mensaje de error en el área de resultado
 */
function mostrarError(mensaje) {
    const textoResultado = document.getElementById("detalle-cotizacion");
    const divResultado = document.getElementById("resultado");
    divResultado.style.display = "block";
    textoResultado.innerHTML = `
        <div class="bg-red-50 text-red-600 p-4 rounded-lg">
            <i class="fas fa-exclamation-triangle mr-2"></i>${mensaje}
        </div>`;
}

// ============================================
// 4. CARRUSEL DE TESTIMONIOS
// Demuestra: bucles, arrays, DOM, eventos,
// setInterval, funciones
// ============================================

// Variables globales del carrusel
let testimonioActual = 0;
let intervaloCarrusel = null;

/**
 * Renderiza las estrellas de rating
 * Usa: bucle for, string concatenación
 */
function renderizarEstrellas(rating) {
    let estrellas = "";
    // BUCLE FOR: iterar según el rating
    for (let i = 1; i <= 5; i++) {
        // Operador ternario: condición ? valorTrue : valorFalse
        if (i <= rating) {
            estrellas += '<i class="fas fa-star text-yellow-400"></i>';
        } else {
            estrellas += '<i class="far fa-star text-gray-300"></i>';
        }
    }
    return estrellas;
}

/**
 * Muestra un testimonio específico en el carrusel
 */
function mostrarTestimonio(index) {
    const contenedor = document.getElementById("testimonial-content");
    const indicadores = document.getElementById("testimonial-dots");

    if (!contenedor || !indicadores) return;

    // Verificar que el índice esté dentro del rango
    // Operador módulo (%) para ciclo infinito
    if (index >= testimonios.length) {
        testimonioActual = 0;
    } else if (index < 0) {
        testimonioActual = testimonios.length - 1;
    } else {
        testimonioActual = index;
    }

    const testimonio = testimonios[testimonioActual];

    // ---- TEMPLATE LITERALS Y MÉTODOS DE STRING ----
    contenedor.innerHTML = `
        <div class="testimonial-card bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center fade-in">
            <div class="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-red-100">
                <img src="${testimonio.foto}" alt="${testimonio.nombre}"
                     class="w-full h-full object-cover"
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(testimonio.nombre)}&background=dc2626&color=fff'">
            </div>
            <div class="mb-3">
                ${renderizarEstrellas(testimonio.rating)}
            </div>
            <p class="text-gray-600 italic mb-6 leading-relaxed">"${testimonio.texto}"</p>
            <h4 class="font-bold text-lg text-gray-800">${testimonio.nombre}</h4>
            <p class="text-sm text-gray-500"><i class="fas fa-car mr-1"></i>${testimonio.vehiculo}</p>
        </div>`;

    // Renderizar indicadores (dots)
    // ---- BUCLE forEach con arrays ----
    let dotsHTML = "";
    testimonios.forEach(function(_, index) {
        // Operador ternario para clase activa
        const activa = index === testimonioActual ? "bg-red-600 scale-125" : "bg-gray-300 hover:bg-gray-400";
        dotsHTML += `<button class="testimonial-dot w-3 h-3 rounded-full ${activa} transition-all duration-300" 
                            onclick="irATestimonio(${index})"></button>`;
    });
    indicadores.innerHTML = dotsHTML;
}

/**
 * Navega al testimonio indicado
 */
function irATestimonio(index) {
    mostrarTestimonio(index);
    reiniciarIntervalo();
}

/**
 * Avanza al siguiente testimonio
 */
function siguienteTestimonio() {
    mostrarTestimonio(testimonioActual + 1);
}

/**
 * Retrocede al testimonio anterior
 */
function anteriorTestimonio() {
    mostrarTestimonio(testimonioActual - 1);
}

/**
 * Inicia el auto-play del carrusel
 * Usa: setInterval para ejecutar cada N milisegundos
 */
function iniciarCarrusel() {
    // setInterval ejecuta la función cada 5000ms (5 segundos)
    intervaloCarrusel = setInterval(siguienteTestimonio, 5000);
}

/**
 * Reinicia el intervalo del carrusel
 */
function reiniciarIntervalo() {
    // Detener el intervalo actual
    if (intervaloCarrusel) {
        clearInterval(intervaloCarrusel);
    }
    // Iniciar de nuevo
    iniciarCarrusel();
}

// ============================================
// 5. EFECTO DE TYPING EN EL HERO
// ============================================

/**
 * Efecto de escritura para el subtítulo del hero
 * Demuestra: recursion con setTimeout, charAt, substring
 */
function iniciarTypingEffect() {
    const elemento = document.getElementById("typing-text");
    if (!elemento) return;

    const textos = [
        "Mecánica Profesional en Arequipa",
        "Tu Taller de Confianza",
        "Tecnología de Punta",
        "Servicio Certificado y Garantizado"
    ];

    let indiceTexto = 0;
    let indiceCaracter = 0;
    let borrando = false;

    function escribir() {
        const textoActual = textos[indiceTexto];

        if (!borrando) {
            // Agregar un caracter a la vez
            elemento.textContent = textoActual.substring(0, indiceCaracter + 1);
            indiceCaracter++;

            // Si terminó de escribir
            if (indiceCaracter === textoActual.length) {
                // Esperar 2 segundos antes de borrar
                setTimeout(function() {
                    borrando = true;
                    escribir();
                }, 2000);
                return;
            }
        } else {
            // Borrar un caracter a la vez
            elemento.textContent = textoActual.substring(0, indiceCaracter - 1);
            indiceCaracter--;

            if (indiceCaracter === 0) {
                borrando = false;
                // Avanzar al siguiente texto (usando módulo para ciclo)
                indiceTexto = (indiceTexto + 1) % textos.length;
            }
        }

        // Velocidad de escritura/borrado
        let velocidad = borrando ? 40 : 80;

        setTimeout(escribir, velocidad);
    }

    // Iniciar el efecto
    escribir();
}

// ============================================
// 6. RENDERIZAR SERVICIOS POPULARES
// Demuestra: sort, slice, arrays
// ============================================

function renderizarServiciosPopulares() {
    const contenedor = document.getElementById("servicios-populares");
    if (!contenedor) return;

    // Ordenar servicios por un criterio de popularidad (simulado)
    // Array method: sort() con función comparadora
    const populares = [...serviciosData].sort(function(a, b) {
        // Ordenar por ID invertido para mostrar los más recientes primero
        return b.id - a.id;
    }).slice(0, 4); // Tomar solo los primeros 4

    // Bucle forEach para generar HTML
    let html = "";
    populares.forEach(function(servicio) {
        html += `
            <div class="card reveal">
                <i class="fas fa-${obtenerIconoServicio(servicio.categoria)} text-red-500 text-3xl mb-4"></i>
                <h3 class="font-bold mb-2 text-lg">${servicio.nombre}</h3>
                <p class="text-sm text-gray-600 mb-3">${servicio.descripcion}</p>
                <span class="text-red-600 font-bold">Desde S/ ${servicio.precio}</span>
            </div>`;
    });

    contenedor.innerHTML = html;
}

/**
 * Devuelve el icono de Font Awesome según la categoría
 * Demuestra: switch statement
 */
function obtenerIconoServicio(categoria) {
    switch (categoria) {
        case "Mantenimiento":
            return "tools";
        case "Reparación":
            return "bolt";
        case "Diagnóstico":
            return "stethoscope";
        case "Personalización":
            return "tachometer-alt";
        default:
            return "cog";
    }
}

// ============================================
// 7. INICIALIZACIÓN (DOMContentLoaded)
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar carrusel de testimonios
    if (document.getElementById("testimonial-content")) {
        mostrarTestimonio(0);
        iniciarCarrusel();
    }

    // Iniciar efecto typing
    iniciarTypingEffect();

    // Renderizar servicios populares
    renderizarServiciosPopulares();

    // Agregar event listeners a botones del carrusel
    const btnPrev = document.getElementById("testimonial-prev");
    const btnNext = document.getElementById("testimonial-next");

    if (btnPrev) {
        btnPrev.addEventListener("click", function() {
            anteriorTestimonio();
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", function() {
            siguienteTestimonio();
        });
    }

    // Botón calcular del cotizador
    const btnCalcular = document.getElementById("btn-calcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", calcularPresupuesto);
    }

    // Validación en tiempo real del campo cantidad
    const inputCantidad = document.getElementById("cantidad");
    if (inputCantidad) {
        inputCantidad.addEventListener("input", function() {
            // Solo permitir números positivos
            // Regex para validar solo números
            this.value = this.value.replace(/[^0-9]/g, "");
        });
    }

    console.log("AutoElite - Página principal inicializada correctamente.");
});
