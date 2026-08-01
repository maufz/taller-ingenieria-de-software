const administradores = [
    {
        usuario: "admin",
        password: "1234"
    }
];

function validarLogin(usuario, password) {
    return administradores.find(admin =>
        admin.usuario === usuario &&
        admin.password === password
    );
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        administradores,
        validarLogin
    };
}