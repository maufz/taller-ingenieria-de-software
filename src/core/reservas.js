const obtenerReservas = () => {
  const reservasLS = localStorage.getItem("reservas");
  const reservas = reservasLS ? JSON.parse(reservasLS) : [];
  return reservas;
}

const guardarCambios = (reservas) => {
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

const agregarReserva = async (reserva) => {
  try {
    const reservas = await obtenerReservas();
    reservas.push(reserva);
    guardarCambios(reservas);
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

function validarCantidadHuespedes(tipoHabitacion, cantidad) {

  cantidad = Number(cantidad);

  if (cantidad <= 0) {
    return "La cantidad de huéspedes debe ser mayor a 0.";
  }

  const capacidades = {
    standard: 1,
    premium: 2,
    luxury: 3,
    presidencial: 4
  };

  if (cantidad > capacidades[tipoHabitacion]) {
    return `La habitación ${tipoHabitacion} admite hasta ${capacidades[tipoHabitacion]} huésped(es).`;
  }

  return "";
}

function validarFechas(fechaIngreso, fechaSalida) {

  const ingreso = new Date(fechaIngreso);
  const salida = new Date(fechaSalida);

  if (isNaN(ingreso) || isNaN(salida)) {
    return "Debe ingresar fechas válidas.";
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  ingreso.setHours(0, 0, 0, 0);
  salida.setHours(0, 0, 0, 0);

  if (ingreso < hoy) {
    return "La fecha de ingreso no puede ser anterior a hoy.";
  }

  if (salida <= ingreso) {
    return "La fecha de salida debe ser posterior a la de ingreso.";
  }

  return "";
}

function validarTelefono(telefono) {

  const regex = /^[0-9+\-\s]{8,15}$/;

  if (!regex.test(telefono)) {
    return "Ingrese un teléfono válido.";
  }

  return "";
}

function validarEmail(email) {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Ingrese un correo válido.";
  }

  return "";
}

function validarReserva(datos) {

  let error;

  error = validarTelefono(datos.telefono);
  if (error) return error;

  error = validarEmail(datos.email);
  if (error) return error;

  error = validarCantidadHuespedes(
    datos.habitacion,
    datos.huespedes
  );

  if (error) return error;

  error = validarFechas(
    datos.fecha_ingreso,
    datos.fecha_salida
  );

  if (error) return error;

  return "";
}
