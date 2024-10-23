import RepositoryFactory from "./RepositoryFactory";
import TicketRepository from "./TicketRepository";


export default class GetTicket {
    ticketRepository: TicketRepository
    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.ticketRepository = repositoryFactory.createTicketRepository()
    }


    async execute(ticketId: string): Promise<Output> {
        const ticket = await this.ticketRepository.getTicket(ticketId)
        return {
            ticketId: ticket.ticketId,
            eventId: ticket.eventId,
            email: ticket.getEmail(),
            price: ticket.price
        }
    }
}



type Output = {
    ticketId: string,
    eventId: string,
    email: string,
    price: number
}