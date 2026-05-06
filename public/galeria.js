// ============================================================
// galeria.js — AutoElite Gallery Page Logic
// ============================================================

// --- Gallery Data Array ---
const galeriaData = [
    {
        id: 1,
        titulo: "Reparación de Motor V8",
        categoria: "Mecánica",
        imagen: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
        descripcion: "Reconstrucción completa de motor V8 con piezas originales y acabado de fábrica."
    },
    {
        id: 2,
        titulo: "Turbo Instalación Deportiva",
        categoria: "Mecánica",
        imagen: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
        descripcion: "Instalación de sistema turbo completo para incremento de potencia y rendimiento."
    },
    {
        id: 3,
        titulo: "Detailing Premium Exterior",
        categoria: "Pintura",
        imagen: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
        descripcion: "Pulido cerámico y sellado de pintura para protección extrema y brillo intenso."
    },
    {
        id: 4,
        titulo: "Suspensiones Deportivas",
        categoria: "Mecánica",
        imagen: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
        descripcion: "Montaje de suspensión deportiva ajustable para mejor agarre y estabilidad."
    },
    {
        id: 5,
        titulo: "Restauración Clásica",
        categoria: "Pintura",
        imagen: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
        descripcion: "Restauración completa de carrocería y pintura de vehículo clásico de colección."
    },
    {
        id: 6,
        titulo: "Diagnóstico Electrónico Avanzado",
        categoria: "Eléctricos",
        imagen: "https://images.unsplash.com/photo-1503376780353-766e1452684a?auto=format&fit=crop&w=800&q=80",
        descripcion: "Escaneo completo de sistemas electrónicos con equipos de última generación."
    },
    {
        id: 7,
        titulo: "Frenos de Alto Rendimiento",
        categoria: "Mecánica",
        imagen: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
        descripcion: "Instalación de kit de frenos deportivos con discos perforados y pastillas cerámicas."
    },
    {
        id: 8,
        titulo: "Pintura Mate Personalizada",
        categoria: "Pintura",
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
        descripcion: "Aplicación de pintura mate personalizada con acabado exclusivo y protección UV."
    },
    {
        id: 9,
        titulo: "Sistema de Iluminación LED",
        categoria: "Eléctricos",
        imagen: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
        descripcion: "Instalación completa de faros LED, DRL y luces ambientales interiores."
    },
    {
        id: 10,
        titulo: "Llantas y Accesorios Premium",
        categoria: "Accesorios",
        imagen: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
        descripcion: "Montaje de llantas de aleación de alta gama con tuercas de seguridad incluidas."
    },
    {
        id: 11,
        titulo: "Escape Deportivo Custom",
        categoria: "Accesorios",
        imagen: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
        descripcion: "Fabricación e instalación de sistema de escape deportivo a medida con sonido agresivo."
    },
    {
        id: 12,
        titulo: "Interior Tapizado Cuero",
        categoria: "Accesorios",
        imagen: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?auto=format&fit=crop&w=800&q=80",
        descripcion: "Tapizado completo en cuero genuino con costuras decorativas a medida."
    }
];

// --- State ---
let filtroGaleria = "Todos";
let imagenesVisibles = 6;
const IMAGENES_POR_CARGA = 6;

// --- Lightbox State ---
let lightboxIndex = 0;
let lightboxItems = [];

// --- DOM Elements ---
const galeriaGrid = document.getElementById("galeria-grid");
const loadMoreBtn = document.getElementById("load-more-btn");
const loadMoreContainer = document.getElementById("load-more-container");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const galeriaFilterBtns = document.querySelectorAll(".galeria-filter-btn");

// --- Get Filtered Data ---
function getFilteredData() {
    if (filtroGaleria === "Todos") {
        return galeriaData.slice();
    }
    return galeriaData.filter(function(item) {
        return item.categoria === filtroGaleria;
    });
}

// --- Render Gallery ---
function renderGaleria(addMore) {
    const filtered = getFilteredData();
    const itemsToShow = filtered.slice(0, imagenesVisibles);

    if (addMore) {
        // Only append new items
        const existingCount = galeriaGrid.children.length;
        const newItems = filtered.slice(existingCount, imagenesVisibles);

        newItems.forEach(function(item, index) {
            const card = createGalleryCard(item, true);
            galeriaGrid.appendChild(card);
        });
    } else {
        galeriaGrid.innerHTML = "";
        itemsToShow.forEach(function(item, index) {
            const card = createGalleryCard(item, false);
            galeriaGrid.appendChild(card);
        });
    }

    // Show/hide load more button
    if (imagenesVisibles >= filtered.length) {
        loadMoreContainer.classList.add("hidden");
    } else {
        loadMoreContainer.classList.remove("hidden");
    }
}

// --- Create Gallery Card ---
function createGalleryCard(item, fadeIn) {
    const card = document.createElement("div");
    card.className = "gallery-item group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" + (fadeIn ? " fade-in" : "");
    card.setAttribute("data-index", item.id);

    // Category badge colors
    let badgeClass = "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400";
    if (item.categoria === "Mecánica") {
        badgeClass = "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
    } else if (item.categoria === "Eléctricos") {
        badgeClass = "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400";
    } else if (item.categoria === "Pintura") {
        badgeClass = "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400";
    } else if (item.categoria === "Accesorios") {
        badgeClass = "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
    }

    card.innerHTML = `
        <img src="${item.imagen}" alt="${item.titulo}" class="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
            <span class="${badgeClass} text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">${item.categoria}</span>
            <h4 class="text-white font-bold text-lg">${item.titulo}</h4>
            <p class="text-gray-300 text-sm mt-1 mb-3 line-clamp-2">${item.descripcion}</p>
            <button class="ver-detalle-btn bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 w-fit">
                <i class="fas fa-expand mr-1"></i>Ver Detalle
            </button>
        </div>
    `;

    // Click event to open lightbox
    card.addEventListener("click", function() {
        const filtered = getFilteredData();
        const idx = filtered.findIndex(function(g) { return g.id === item.id; });
        openLightbox(idx);
    });

    return card;
}

// --- Lightbox Functions ---
function openLightbox(index) {
    lightboxItems = getFilteredData();
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function nextLightbox() {
    lightboxIndex++;
    if (lightboxIndex >= lightboxItems.length) {
        lightboxIndex = 0;
    }
    updateLightbox();
}

function prevLightbox() {
    lightboxIndex--;
    if (lightboxIndex < 0) {
        lightboxIndex = lightboxItems.length - 1;
    }
    updateLightbox();
}

function updateLightbox() {
    const item = lightboxItems[lightboxIndex];
    lightboxImage.src = item.imagen;
    lightboxImage.alt = item.titulo;
    lightboxTitle.textContent = item.titulo;
    lightboxDesc.textContent = item.descripcion;
    lightboxCounter.textContent = (lightboxIndex + 1) + " / " + lightboxItems.length;
}

// --- Lightbox Event Listeners ---
lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", nextLightbox);
lightboxPrev.addEventListener("click", prevLightbox);

// Close on clicking the dark backdrop (not the image)
lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// --- Keyboard Navigation ---
document.addEventListener("keydown", function(e) {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
        closeLightbox();
    } else if (e.key === "ArrowRight") {
        nextLightbox();
    } else if (e.key === "ArrowLeft") {
        prevLightbox();
    }
});

// --- Filter Buttons ---
galeriaFilterBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        // Update active state
        galeriaFilterBtns.forEach(function(b) {
            b.classList.remove("bg-red-600", "text-white", "active");
            b.classList.add("bg-gray-200", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300");
        });
        this.classList.add("bg-red-600", "text-white", "active");
        this.classList.remove("bg-gray-200", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300");

        filtroGaleria = this.getAttribute("data-filter");
        imagenesVisibles = 6;
        renderGaleria(false);
    });
});

// --- Load More ---
loadMoreBtn.addEventListener("click", function() {
    imagenesVisibles += IMAGENES_POR_CARGA;
    renderGaleria(true);
});

// --- Initial Render ---
renderGaleria(false);
