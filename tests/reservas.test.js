const {
  validarCantidadHuespedes,
  validarFechas,
  validarTelefono,
  validarEmail,
  validarReserva
} = require("../src/core/reservas");

// Congelamos "hoy" en el 1 de agosto de 2026 para poder escribir fechas literales.
jest.useFakeTimers();
jest.setSystemTime(new Date("2026-08-01T12:00:00"));

const RESERVA = {
  telefono: "1122334455",
  email: "cliente@mail.com",
  habitacion: "premium",
  huespedes: 2,
  fecha_ingreso: "2026-08-10",
  fecha_salida: "2026-08-12"
};

describe("validarTelefono", () => {

  test("acepta 10 números", () => {
    expect(validarTelefono("1122334455")).toBe("");
  })

  test("acepta el prefijo + y los espacios", () => {
    expect(validarTelefono("+54 11 2233")).toBe("");
  })

  test("rechaza menos de 8 caracteres", () => {
    expect(validarTelefono("1234567")).toBe("Ingrese un teléfono válido.");
  })

  test("rechaza más de 15 caracteres", () => {
    expect(validarTelefono("1234567890123456")).toBe("Ingrese un teléfono válido.");
  })

  test("rechaza letras", () => {
    expect(validarTelefono("11ab334455")).toBe("Ingrese un teléfono válido.");
  })

  test("rechaza el teléfono vacío", () => {
    expect(validarTelefono("")).toBe("Ingrese un teléfono válido.");
  })
})

describe("validarEmail", () => {

  test("acepta un correo con formato correcto", () => {
    expect(validarEmail("cliente@mail.com")).toBe("");
  })

  test("rechaza un correo sin arroba", () => {
    expect(validarEmail("clientemail.com")).toBe("Ingrese un correo válido.");
  })

  test("rechaza un correo sin dominio", () => {
    expect(validarEmail("cliente@")).toBe("Ingrese un correo válido.");
  })

  test("rechaza un dominio sin punto", () => {
    expect(validarEmail("cliente@mail")).toBe("Ingrese un correo válido.");
  })

  test("rechaza un correo con espacios", () => {
    expect(validarEmail("cli ente@mail.com")).toBe("Ingrese un correo válido.");
  })

  test("rechaza el correo vacío", () => {
    expect(validarEmail("")).toBe("Ingrese un correo válido.");
  })
})

describe("validarCantidadHuespedes", () => {

  test("standard acepta 1 huésped", () => {
    expect(validarCantidadHuespedes("standard", 1)).toBe("");
  })

  test("presidencial acepta 4 huéspedes", () => {
    expect(validarCantidadHuespedes("presidencial", 4)).toBe("");
  })

  test("acepta la cantidad escrita como texto", () => {
    expect(validarCantidadHuespedes("premium", "2")).toBe("");
  })

  test("rechaza 0 huéspedes", () => {
    expect(validarCantidadHuespedes("premium", 0))
      .toBe("La cantidad de huéspedes debe ser mayor a 0.");
  })

  test("standard rechaza 2 huéspedes", () => {
    expect(validarCantidadHuespedes("standard", 2))
      .toBe("La habitación standard admite hasta 1 huésped(es).");
  })

  test("premium rechaza 3 huéspedes", () => {
    expect(validarCantidadHuespedes("premium", 3))
      .toBe("La habitación premium admite hasta 2 huésped(es).");
  })
})

describe("validarFechas", () => {

  test("acepta un rango futuro", () => {
    expect(validarFechas("2026-08-10", "2026-08-12")).toBe("");
  })

  test("rechaza un ingreso anterior a hoy", () => {
    expect(validarFechas("2026-07-20", "2026-08-12"))
      .toBe("La fecha de ingreso no puede ser anterior a hoy.");
  })

  test("rechaza una salida anterior al ingreso", () => {
    expect(validarFechas("2026-08-12", "2026-08-10"))
      .toBe("La fecha de salida debe ser posterior a la de ingreso.");
  })

  test("rechaza una salida igual al ingreso", () => {
    expect(validarFechas("2026-08-10", "2026-08-10"))
      .toBe("La fecha de salida debe ser posterior a la de ingreso.");
  })

  test("rechaza un texto que no es fecha", () => {
    expect(validarFechas("no-es-fecha", "2026-08-12"))
      .toBe("Debe ingresar fechas válidas.");
  })

  test("rechaza las fechas vacías", () => {
    expect(validarFechas("", "")).toBe("Debe ingresar fechas válidas.");
  })
})

describe("validarReserva", () => {

  test("no devuelve error cuando todos los datos son correctos", () => {
    expect(validarReserva(RESERVA)).toBe("");
  })

  test("avisa primero del teléfono", () => {
    expect(validarReserva({ ...RESERVA, telefono: "123", email: "invalido" }))
      .toBe("Ingrese un teléfono válido.");
  })

  test("avisa del correo", () => {
    expect(validarReserva({ ...RESERVA, email: "invalido", huespedes: 99 }))
      .toBe("Ingrese un correo válido.");
  })

  test("avisa de la cantidad de huéspedes", () => {
    expect(validarReserva({ ...RESERVA, huespedes: 99 }))
      .toBe("La habitación premium admite hasta 2 huésped(es).");
  })

  test("avisa de las fechas", () => {
    expect(validarReserva({ ...RESERVA, fecha_ingreso: "2026-07-20" }))
      .toBe("La fecha de ingreso no puede ser anterior a hoy.");
  })
})
