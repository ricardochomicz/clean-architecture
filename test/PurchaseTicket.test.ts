import { PgPromiseAdapter } from "../src/DatabaseConnection";
import { EventRepositoryDatabase, EventRepositoryFake } from "../src/EventRepository";
import GetTicket from "../src/GetTicket";
import PurchaseTicket from "../src/PurchaseTicket";
import { TicketRepositoryDatabase, TicketRepositoryFake } from "../src/TicketRepository";
import RepositoryFactory, { RepositoryFactoryDatabase } from '../src/RepositoryFactory';

test("Deve comprar o ingresso para o evento", async function () {
    const connection = new PgPromiseAdapter();
    const repositoryFactory = new RepositoryFactoryDatabase(connection)
    const purchaseTicket = new PurchaseTicket(repositoryFactory)
    const getTicket = new GetTicket(repositoryFactory)
    const inputPurchaseTicket = {
        eventId: "768bdbe9-6e65-47a4-ad80-60ac28a1a3f9",
        email: "ricardo.chomicz@gmail.com"
    };
    const outputPurchaseTicket = await purchaseTicket.execute(inputPurchaseTicket)

    expect(outputPurchaseTicket.ticketId).toBeDefined()


    const outputGetTicket = await getTicket.execute(outputPurchaseTicket.ticketId)

    expect(outputGetTicket.ticketId).toBe(outputPurchaseTicket.ticketId)
    expect(outputGetTicket.eventId).toBe(inputPurchaseTicket.eventId)
    expect(outputGetTicket.email).toBe(inputPurchaseTicket.email)
    expect(outputGetTicket.price).toBe(100)
});