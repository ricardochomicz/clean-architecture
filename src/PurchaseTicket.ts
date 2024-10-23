import crypto from "crypto"
import EventRepository from "./EventRepository";
import TicketRepository from "./TicketRepository";
import Ticket from "./Ticket";
import RepositoryFactory from "./RepositoryFactory";

export default class PurchaseTicket {
    eventRepository: EventRepository
    ticketRepository: TicketRepository

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.eventRepository = repositoryFactory.createEventRepository();
        this.ticketRepository = repositoryFactory.createTicketRepository();
    }


    async execute(input: Input): Promise<Output> {
        const eventData = await this.eventRepository.getEvent(input.eventId)
        const ticket = Ticket.create(input.eventId, input.email, eventData.price)

        await this.ticketRepository.saveTicket(ticket)
        return {
            ticketId: ticket.ticketId
        }
    }
}

type Input = {
    eventId: string,
    email: string
}

type Output = {
    ticketId: string
}