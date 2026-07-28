const obtenerReservas = () => {
  const reservasLS = localStorage.getItem("reservas");
  console.log(reservasLS)
  const reservas = JSON.parse(reservasLS);
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
  catch {
    return false;
  }
}
