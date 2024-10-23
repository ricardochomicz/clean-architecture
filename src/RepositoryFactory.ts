import DatabaseConnection from "./DatabaseConnection"
import EventRepository, { EventRepositoryDatabase } from "./EventRepository"
import TicketRepository, { TicketRepositoryDatabase } from "./TicketRepository"

export default interface RepositoryFactory {
    createEventRepository(): EventRepository
    createTicketRepository(): TicketRepository
}

export class RepositoryFactoryDatabase implements RepositoryFactory {

    constructor(readonly connection: DatabaseConnection) { }
    createEventRepository(): EventRepository {
        return new EventRepositoryDatabase(this.connection)
    }

    createTicketRepository(): TicketRepository {
        return new TicketRepositoryDatabase(this.connection)
    }
}