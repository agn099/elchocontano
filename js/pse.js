// pse.js

document.addEventListener("DOMContentLoaded", function () {
  const pseFields = document.getElementById("pseFields");
  pseFields.style.display = "none";

  const radios = document.querySelectorAll('input[name="optradio"]');
  radios.forEach(radio => {
    radio.addEventListener("change", function () {
      if (this.value === "PSE") {
        pseFields.style.display = "block";
      } else {
        pseFields.style.display = "none";
      }
    });
  });

  window.confirmarPagoPSE = function () {
    const banco = document.getElementById("pseBank").value;
    const tipo = document.getElementById("pseType").value;
    const cuenta = document.getElementById("pseAccount").value.trim();
    const cedula = document.getElementById("pseCedula").value.trim();

    if (!cuenta || !cedula) {
      alert("Por favor completa los datos bancarios.");
      return;
    }

    console.log("✅ Pago PSE simulado:", { banco, tipo, cuenta, cedula });
    alert("Pago simulado por PSE exitoso.");
  };
});