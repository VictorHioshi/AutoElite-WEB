function calcularPresupuesto() {
    // 1. Capturamos los elementos del HTML (DOM)
    const selectServicio = document.getElementById('servicio');
    const inputCantidad = document.getElementById('cantidad');
    const areaResultado = document.getElementById('resultado');
    const textoResultado = document.getElementById('detalle-cotizacion');

    // 2. Obtenemos los valores
    const precio = parseFloat(selectServicio.value);
    const cantidad = parseInt(inputCantidad.value);
    const nombreServicio = selectServicio.options[selectServicio.selectedIndex].text;

    // 3. Validación (Importante para la rúbrica)
    if (precio === 0 || isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // 4. Lógica de cálculo y operadores
    let total = precio * cantidad;
    let mensajeExtra = "";

    // Aplicamos un descuento si son 3 o más vehículos (Demuestra lógica de programación)
    if (cantidad >= 3) {
        total = total * 0.90; // 10% de descuento
        mensajeExtra = "<br><span style='color: green;'>¡Descuento de flota (10%) aplicado!</span>";
    }

    // 5. Mostrar el resultado en la página
    areaResultado.style.display = "block"; // Hace visible el cuadro
    textoResultado.innerHTML = `
        Servicio: ${nombreServicio.split('(')[0]} <br>
        Total a pagar: S/ ${total.toFixed(2)} 
        ${mensajeExtra}
    `;
}