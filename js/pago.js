// pago.js

document.addEventListener("DOMContentLoaded", function () {
  const mostrarBtn = document.getElementById("mostrarMetodosBtn");
  const metodosDiv = document.getElementById("metodosPago");
  const metodoSelect = document.getElementById("metodoPago");
  const formularioDiv = document.getElementById("formularioPago");
  const finalizarBtn = document.getElementById("finalizarCompraBtn");

  mostrarBtn.addEventListener("click", () => {
    metodosDiv.style.display = "block";
  });

  metodoSelect.addEventListener("change", () => {
    const metodo = metodoSelect.value;
    formularioDiv.innerHTML = "";
    formularioDiv.style.display = "block";

    if (metodo === "PSE") {
      formularioDiv.innerHTML = `
        <h4>Pago por PSE</h4>
        <label>Banco:</label>
        <select class="form-control">
          <option>Bancolombia</option>
          <option>Davivienda</option>
          <option>Nequi</option>
          <option>Banco de Bogotá</option>
        </select>
        <label>Cédula:</label>
        <input type="text" class="form-control">
      `;
    } else if (metodo === "Nequi") {
      formularioDiv.innerHTML = `
        <h4>Pago por Nequi</h4>
        <p>Transfiere a <strong>322 123 4567</strong> y escribe el número de comprobante:</p>
        <input type="text" class="form-control" placeholder="Comprobante">
      `;
    } else if (metodo === "Tarjeta") {
      formularioDiv.innerHTML = `
        <h4>Pago con tarjeta</h4>
        <label>Número de tarjeta:</label>
        <input type="text" class="form-control">
        <label>Fecha de vencimiento:</label>
        <input type="text" class="form-control" placeholder="MM/AA">
        <label>CVV:</label>
        <input type="text" class="form-control">
      `;
    }

    finalizarBtn.style.display = "inline-block";
  });

  finalizarBtn.addEventListener("click", () => {
    alert("✅ Compra simulada con éxito. Gracias por tu pedido.");
  });
});