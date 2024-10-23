import Email from "./Email";

export default class Ticket {
    private email: Email;

    constructor(
        readonly ticketId: string,
        readonly eventId: string,
        email: string,
        readonly price: number
    ) {
        this.email = new Email(email)
        if (price <= 0) throw new Error("Invalid price");
    }

    static create(eventId: string, email: string, price: number) {
        const ticketId = crypto.randomUUID()
        return new Ticket(ticketId, eventId, email, price)
    }

    getEmail() {
        return this.email.getValue()
    }
}
