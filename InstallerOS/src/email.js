// EMAILJS PARA ENVIO DE DATOS
const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const servicio = document.getElementById("title").value.trim();
  const nombre = document.getElementById("name").value.trim();
  const correo = document.getElementById("email").value.trim();
  const descripcion = document.getElementById("message").value.trim();

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

  if (!servicio || !nombre || !correo) {
    alert("Debe rellenar todos los campos para continuar.");
  }

  if (!servicio) {
    alert("Por favor seleccione un servicio.");
    return;
  }

  if (!soloLetras.test(nombre)) {
    alert("El nombre solo puede contener letras y espacios.");
    return;
  }

  if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
    alert("Por favor ingrese un correo electrónico válido.");
    return;
  }

  if (!soloLetras.test(descripcion)) {
    alert("La descripción solo puede contener letras y espacios.");
    return;
  }

  // REGISTRAR LOCALMENTE
  const solicitud = {
    servicio,
    nombre,
    correo,
    descripcion,
    fecha: new Date().toLocaleString(),
  };

  // GUARDAR EN LOCALSTORAGE
  let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
  solicitudes.push(solicitud);
  localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

  // MOSTRAR POR CONSOLA LA SOLICITUD
  console.log("Nueva solicitud registrada:", solicitud);

  btn.value = "Enviando...";

  const serviceID = "default_service";
  const templateID = "template_11ucs2t";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Enviar";
      alert("Solicitud enviada correctamente.");
    },
    (err) => {
      btn.value = "Enviar";
      alert(JSON.stringify(err));
    }
  );
});
