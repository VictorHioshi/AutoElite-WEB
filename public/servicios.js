// ============================================================
// servicios.js — AutoElite Services Page Logic
// ============================================================

// --- Services Data Array ---
const servicios = [
    {
        id: 1,
        nombre: "Cambio de Aceite y Filtros",
        categoria: "Mantenimiento",
        precio: 120,
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80",
        descripcion: "Servicio completo de cambio de aceite con lubricantes sintéticos de alta calidad. Incluye reemplazo de filtros de aceite y aire para garantizar el máximo rendimiento de tu motor y prolongar su vida útil.",
        caracteristicas: ["Aceite sintético premium", "Filtro de aceite nuevo", "Filtro de aire incluido", "Revisión general del motor"]
    },
    {
        id: 2,
        nombre: "Mantenimiento Preventivo",
        categoria: "Mantenimiento",
        precio: 200,
        imagen: "https://images.unsplash.com/photo-1503376780353-766e1452684a?auto=format&fit=crop&w=600&q=80",
        descripcion: "Revisión integral de todos los sistemas de tu vehículo para prevenir fallas futuras. Nuestros técnicos certificados inspeccionan más de 50 puntos críticos para asegurar tu seguridad en la carretera.",
        caracteristicas: ["Inspección de 50+ puntos", "Revisión de frenos", "Verificación de niveles", "Diagnóstico computarizado"]
    },
    {
        id: 3,
        nombre: "Reparación de Motor",
        categoria: "Reparación",
        precio: 500,
        imagen: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
        descripcion: "Diagnóstico y reparación especializada de motores de todas las marcas. Desde ajustes menores hasta reconstrucciones completas, contamos con herramientas de última generación y técnicos especializados.",
        caracteristicas: ["Diagnóstico avanzado", "Piezas originales", "Garantía de servicio", "Reconstrucción completa"]
    },
    {
        id: 4,
        nombre: "Sistema Eléctrico",
        categoria: "Reparación",
        precio: 350,
        imagen: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
        descripcion: "Solución de problemas eléctricos complejos incluyendo fallas en el sistema de arranque, alternador, batería, luces y sensores. Utilizamos equipos de diagnóstico de última generación.",
        caracteristicas: ["Diagnóstico por osciloscopio", "Reparación de cableado", "Revisión de sensores", "Sistema de arranque"]
    },
    {
        id: 5,
        nombre: "Diagnóstico por Computadora",
        categoria: "Diagnóstico",
        precio: 150,
        imagen: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
        descripcion: "Escaneo computarizado de todos los sistemas electrónicos del vehículo. Detectamos códigos de error, fallas ocultas y realizamos un reporte detallado del estado actual de tu auto.",
        caracteristicas: ["Scanner profesional OBD-II", "Lectura de códigos de error", "Reporte detallado", "Asesoría técnica incluida"]
    },
    {
        id: 6,
        nombre: "Alineación y Balanceo",
        categoria: "Mantenimiento",
        precio: 100,
        imagen: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80",
        descripcion: "Servicio de alineación computarizada y balanceo dinámico de llantas para garantizar una conducción estable, segura y uniforme. Mejora el agarre y reduce el desgaste prematuro de neumáticos.",
        caracteristicas: ["Alineación computarizada", "Balanceo dinámico", "Verificación de suspensión", "Mejora de agarre"]
    },
    {
        id: 7,
        nombre: "Tuning de Motor",
        categoria: "Personalización",
        precio: 800,
        imagen: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80",
        descripcion: "Reprogramación y modificación del motor para obtener máxima potencia y rendimiento. Trabajamos con ECU tuning, escapes de alto flujo, turbo y supercargadores para un resultado excepcional.",
        caracteristicas: ["Reprogramación ECU", "Escape de alto flujo", "Mejora de potencia", "Dinamometría incluida"]
    },
    {
        id: 8,
        nombre: "Instalación de Audio",
        categoria: "Personalización",
        precio: 400,
        imagen: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80",
        descripcion: "Instalación profesional de sistemas de audio de alta fidelidad. Desde reproductores multimedia hasta sistemas completos con amplificadores, subwoofers y componentes premium de las mejores marcas.",
        caracteristicas: ["Sistemas multimedia", "Amplificadores premium", "Instalación de subwoofers", "Aislamiento acústico"]
    },
    {
        id: 9,
        nombre: "Pintura y Carrocería",
        categoria: "Reparación",
        precio: 600,
        imagen: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80",
        descripcion: "Servicios de pintura profesional, reparación de abolladuras, retoque de faros y restauración de carrocería. Utilizamos pinturas base agua y sistemas de cabina climatizada para un acabado impecable.",
        caracteristicas: ["Pintura base agua", "Cabina climatizada", "Reparación de abolladuras", "Garantía de color"]
    }
];

// --- State ---
let filtroActual = "Todos";
let busquedaActual = "";
let ordenActual = "";

// --- DOM Elements ---
const grid = document.getElementById("servicios-grid");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("search-servicios");
const sortSelect = document.getElementById("sort-servicios");
const filterBtns = document.querySelectorAll(".filter-btn");

// --- Render Function ---
function renderServicios(lista) {
    grid.innerHTML = "";

    if (lista.length === 0) {
        noResults.classList.remove("hidden");
        return;
    }

    noResults.classList.add("hidden");

    for (let i = 0; i < lista.length; i++) {
        const servicio = lista[i];

        const card = document.createElement("div");
        card.className = "service-detail-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1";

        // Category badge colors
        let badgeClass = "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400";
        if (servicio.categoria === "Mantenimiento") {
            badgeClass = "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
        } else if (servicio.categoria === "Reparación") {
            badgeClass = "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
        } else if (servicio.categoria === "Diagnóstico") {
            badgeClass = "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400";
        } else if (servicio.categoria === "Personalización") {
            badgeClass = "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400";
        }

        // Build features list
        let featuresHTML = "";
        for (let j = 0; j < servicio.caracteristicas.length; j++) {
            featuresHTML += `<li class="flex items-center text-sm text-gray-600 dark:text-gray-400"><i class="fas fa-check text-green-500 mr-2 text-xs"></i>${servicio.caracteristicas[j]}</li>`;
        }

        card.innerHTML = `
            <div class="relative overflow-hidden group">
                <img src="${servicio.imagen}" alt="${servicio.nombre}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="absolute top-3 left-3 ${badgeClass} text-xs font-semibold px-3 py-1 rounded-full">${servicio.categoria}</span>
            </div>
            <div class="p-6">
                <h3 class="text-lg font-bold mb-2 text-slate-800 dark:text-white">${servicio.nombre}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">${servicio.descripcion}</p>
                <ul class="space-y-2 mb-6">
                    ${featuresHTML}
                </ul>
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span class="text-2xl font-bold text-red-600">S/ ${servicio.precio}</span>
                    <a href="contacto.html" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105">
                        <i class="fas fa-calendar-check mr-1"></i>Solicitar Servicio
                    </a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    }
}

// --- Filter Function ---
function filtrarServicios() {
    let resultado = servicios.slice();

    // Filter by category
    if (filtroActual !== "Todos") {
        resultado = resultado.filter(function(s) {
            return s.categoria === filtroActual;
        });
    }

    // Filter by search
    if (busquedaActual.trim() !== "") {
        resultado = resultado.filter(function(s) {
            return s.nombre.toLowerCase().includes(busquedaActual.toLowerCase()) ||
                   s.descripcion.toLowerCase().includes(busquedaActual.toLowerCase());
        });
    }

    // Sort by price
    if (ordenActual === "asc") {
        resultado.sort(function(a, b) { return a.precio - b.precio; });
    } else if (ordenActual === "desc") {
        resultado.sort(function(a, b) { return b.precio - a.precio; });
    }

    renderServicios(resultado);
}

// --- Event: Filter Buttons ---
for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function() {
        // Update active state
        for (let j = 0; j < filterBtns.length; j++) {
            filterBtns[j].classList.remove("bg-red-600", "text-white", "active");
            filterBtns[j].classList.add("bg-gray-200", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300");
        }
        this.classList.add("bg-red-600", "text-white", "active");
        this.classList.remove("bg-gray-200", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300");

        filtroActual = this.getAttribute("data-filter");
        filtrarServicios();
    });
}

// --- Event: Search Input ---
searchInput.addEventListener("input", function() {
    busquedaActual = this.value;
    filtrarServicios();
});

// --- Event: Sort Select ---
sortSelect.addEventListener("change", function() {
    ordenActual = this.value;
    filtrarServicios();
});

// --- Initial Render ---
filtrarServicios();
