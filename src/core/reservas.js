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
  catch(error) {
    console.log(error);
    return false;
  }
}
