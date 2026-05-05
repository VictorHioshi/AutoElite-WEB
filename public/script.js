window.calcularPresupuesto = function () {
    const selectServicio = document.getElementById('servicio');
    const inputCantidad = document.getElementById('cantidad');
    const areaResultado = document.getElementById('resultado');
    const textoResultado = document.getElementById('detalle-cotizacion');

    const precio = parseFloat(selectServicio.value);
    const cantidad = parseInt(inputCantidad.value);
    const nombreServicio = selectServicio.options[selectServicio.selectedIndex].text;

    if (isNaN(precio) || isNaN(cantidad) || cantidad <= 0 || precio <= 0) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    let total = precio * cantidad;
    let descuentoAplicado = false;

    if (cantidad >= 3) {
        total *= 0.90;
        descuentoAplicado = true;
    }

    areaResultado.style.display = "block";

    let mensaje = `
        Servicio: ${nombreServicio.split('(')[0]} <br>
        Total a pagar: S/ ${total.toFixed(2)}
    `;

    if (descuentoAplicado) {
        mensaje += "<br><span style='color: green;'>¡Descuento de flota (10%) aplicado!</span>";
    }

    textoResultado.innerHTML = mensaje;
};