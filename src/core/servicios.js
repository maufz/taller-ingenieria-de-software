const servicios = [
    {
        nombre: "Desayuno y almuerzo",
        descripcion: "Buffet variado incluido, servido en el salón principal.",
        imagen: "img/desayuno.jpg"
    },
    {
        nombre: "WiFi",
        descripcion: "Conexión gratuita de alta velocidad en todo el hotel.",
        imagen: "img/wifi.jpg"
    },
    {
        nombre: "Piscina",
        descripcion: "Espacio ideal para relajarse durante la estadía.",
        imagen: "img/piscina.jpg"
    },
    {
        nombre: "Estacionamiento",
        descripcion: "Estacionamiento privado para huéspedes.",
        imagen: "img/parking.jpg"
    },
    {
        nombre: "Traslados",
        descripcion: "Servicio de traslado desde y hacia el aeropuerto.",
        imagen: "img/traslado.jpg"
    },
    {
        nombre: "Servicio a la habitación",
        descripcion: "Pedí lo que necesites sin salir de tu habitación.",
        imagen: "img/roomservice.jpg"
    },
    {
        nombre: "Recepción 24 horas",
        descripcion: "Atención personalizada durante todo el día.",
        imagen: "img/recepcion.jpg"
    }
];

const listaServicios = document.querySelector("#listaServicios");

for (const servicio of servicios) {

    listaServicios.innerHTML += `
        <article class="servicio">

            <img src="${servicio.imagen}" alt="${servicio.nombre}">

            <div class="info-servicio">
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
            </div>

        </article>
    `;
}