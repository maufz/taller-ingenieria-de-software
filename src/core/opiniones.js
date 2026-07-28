const opiniones = [
    {
        nombre: "María S.",
        pais: "Argentina",
        estrellas: 5,
        comentario: "Excelente atención, volveríamos sin dudar."
    },
    {
        nombre: "John D.",
        pais: "EE.UU.",
        estrellas: 5,
        comentario: "Great location right on the beach."
    },
    {
        nombre: "Ana P.",
        pais: "Brasil",
        estrellas: 5,
        comentario: "Habitaciones muy cómodas y limpias."
    },
    {
        nombre: "Carlos R.",
        pais: "Argentina",
        estrellas: 4,
        comentario: "Desayuno increíble, personal muy amable."
    }
];

const contenedor = document.querySelector("#listaOpiniones");

for (const opinion of opiniones) {

    let estrellas = "";

    for (let i = 0; i < opinion.estrellas; i++) {
        estrellas += "★";
    }

    contenedor.innerHTML += `
        <article class="opinion">
            <h3>${opinion.nombre} <span>(${opinion.pais})</span></h3>

            <div class="estrellas">
                ${estrellas}
            </div>

            <p>"${opinion.comentario}"</p>
        </article>
    `;
}