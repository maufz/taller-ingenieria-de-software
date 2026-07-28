const paginaReserva = async () => {
  if (!document.body.classList.contains("pagina-reserva")) return;
  
  const form = document.querySelector("form");
  if (!form) return;

  const reservas = await obtenerReservas();
  console.log(reservas);
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Array.from(formData.entries()).reduce((prev, [key, value]) => ({...prev, [key]: value}), {});
    const result = await agregarReserva(data);
    const reservas = await obtenerReservas();
    console.log(reservas);
  })
}

paginaReserva();
