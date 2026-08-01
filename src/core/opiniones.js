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

function obtenerOpiniones() {
    return opiniones;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        opiniones,
        obtenerOpiniones
    };
}