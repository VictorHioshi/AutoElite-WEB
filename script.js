function calcularPresupuesto() {

    const selectServicio = document.getElementById('servicio');
    const inputCantidad = document.getElementById('cantidad');
    const areaResultado = document.getElementById('resultado');
    const textoResultado = document.getElementById('detalle-cotizacion');

    
    const precio = parseFloat(selectServicio.value);
    const cantidad = parseInt(inputCantidad.value);
    const nombreServicio = selectServicio.options[selectServicio.selectedIndex].text;

    
    if (precio === 0 || isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, completa todos los campos.");
        return;
    }

 
    let total = precio * cantidad;
    let mensajeExtra = "";

  
    if (cantidad >= 3) {
        total = total * 0.90; // 10% de descuento
        mensajeExtra = "<br><span style='color: green;'>¡Descuento de flota (10%) aplicado!</span>";
    }

    
    areaResultado.style.display = "block"; 
    textoResultado.innerHTML = `
        Servicio: ${nombreServicio.split('(')[0]} <br>
        Total a pagar: S/ ${total.toFixed(2)} 
        ${mensajeExtra}
    `;
}
