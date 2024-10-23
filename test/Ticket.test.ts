import Ticket from "../src/Ticket"


test("Deve criar um ingresso", async function () {
    const ticket = new Ticket("", "", "ricardo.chomicz@gmail.com", 100)
    expect(ticket.getEmail()).toBe("ricardo.chomicz@gmail.com")
    expect(ticket.price).toBe(100)
});

test("Não deve criar um ingresso com e-mail inválido", async function () {
    expect(() => new Ticket("", "", "ricardo@", 100)).toThrow(new Error("Invalid e-mail"))
})

test("Naõ deve criar o ingresso com preço negativo", async function () {
    expect(() => new Ticket("", "", "ricardo.chomicz@gmail.com", -100)).toThrow(new Error("Invalid price"))
})