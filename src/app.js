const form = document.querySelector("#formLogin");

if (form) {
    form.addEventListener("submit", iniciarSesion);
}

function iniciarSesion(e) {

    e.preventDefault();

    const usuario = document.querySelector("#usuario").value;
    const password = document.querySelector("#password").value;

    const admin = validarLogin(usuario, password);

    if (admin) {

        localStorage.setItem("adminLogueado", "true");

        window.location.href = "listadoReservas.html";

    } else {

        document.querySelector("#mensajeLogin").textContent =
            "Usuario o contraseña incorrectos.";

    }
}

const listaServicios = document.querySelector("#listaServicios");

if (listaServicios) {

    const servicios = obtenerServicios();

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
}

const listaOpiniones = document.querySelector("#listaOpiniones");

if (listaOpiniones) {

    const opiniones = obtenerOpiniones();

    for (const opinion of opiniones) {

        let estrellas = "";

        for (let i = 0; i < opinion.estrellas; i++) {
            estrellas += "★";
        }

        listaOpiniones.innerHTML += `
            <article class="opinion">
                <h3>${opinion.nombre}
                    <span>(${opinion.pais})</span>
                </h3>

                <div class="estrellas">
                    ${estrellas}
                </div>

                <p>"${opinion.comentario}"</p>
            </article>
        `;
    }
}

const fechaIngreso = document.querySelector("#input-fecha-ingreso");

if (fechaIngreso) {

    const hoy = new Date().toISOString().split("T")[0];

    fechaIngreso.min = hoy;
}

const fechaSalida = document.querySelector("#input-fecha-salida");

if (fechaIngreso && fechaSalida) {

    fechaIngreso.addEventListener("change", () => {
        fechaSalida.min = fechaIngreso.value;
    });

}

const paginaReserva = async () => {
    if (!document.body.classList.contains("pagina-reserva")) return;

    const form = document.querySelector("#formReserva");
    if (!form) return;

    const reservas = await obtenerReservas();
    console.log(reservas);



    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Array.from(formData.entries()).reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});
        const error = validarReserva(data);
        if (error) {
            mostrarPopup(error);
            return;
        }
        const result = await agregarReserva(data);
        if (result) {
            mostrarPopup(`
Reserva confirmada.

Nombre: ${data.nombre}
Habitación: ${data.habitacion}
Huéspedes: ${data.huespedes}
Ingreso: ${data.fecha_ingreso}
Salida: ${data.fecha_salida}
`);
            form.reset();
        }
        const reservas = await obtenerReservas();
        console.log(reservas);
    })
}



paginaReserva();

const paginaListado = async () => {

    if (!document.body.classList.contains("pagina-listado")) return;

    const lista = document.querySelector("#listaReservas");
    const mensaje = document.querySelector("#mensajeSinReservas");

    const reservas = await obtenerReservas();

    if (reservas.length === 0) {

        mensaje.textContent = "No existen reservas registradas.";
        return;

    }

    for (const reserva of reservas) {

        let servicios = [];

        if (reserva.servicio_desayuno)
            servicios.push("Desayuno");

        if (reserva.servicio_traslado)
            servicios.push("Traslado");

        if (reserva.servicio_late_checkout)
            servicios.push("Late check-out");

        lista.innerHTML += `

        <article class="reserva">

            <h2>${reserva.nombre}</h2>

            <p><strong>Teléfono:</strong> ${reserva.telefono}</p>

            <p><strong>Email:</strong> ${reserva.email}</p>

            <p><strong>Habitación:</strong> ${reserva.habitacion}</p>

            <p><strong>Huéspedes:</strong> ${reserva.huespedes}</p>

            <p><strong>Ingreso:</strong> ${reserva.fecha_ingreso}</p>

            <p><strong>Salida:</strong> ${reserva.fecha_salida}</p>

            <p><strong>Servicios:</strong>
                ${servicios.length ? servicios.join(", ") : "Ninguno"}
            </p>

            <p><strong>Comentarios:</strong>
                ${reserva.comentarios || "-"}
            </p>

            <button class="boton">
                Cancelar
            </button>

        </article>

        `;
    }

}

paginaListado();

const btnLogout = document.querySelector("#btnLogout");

if (btnLogout) {

    btnLogout.addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.removeItem("adminLogueado");

        window.location.href = "index.html";

    });

}
