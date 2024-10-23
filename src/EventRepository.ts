import pgp from "pg-promise";
import Event from "./Event";
import DatabaseConnection from "./DatabaseConnection";

export default interface EventRepository {
    getEvent(eventId: string): Promise<Event>
}
export class EventRepositoryDatabase implements EventRepository {

    constructor(readonly connection: DatabaseConnection) { }
    async getEvent(eventId: string): Promise<Event> {
        const [event] = await this.connection.query("select * from chomicz.event where event_id = $1", [eventId])
        return new Event(event.event_id, event.description, parseFloat(event.price));
    }
}

export class EventRepositoryFake implements EventRepository {
    async getEvent(eventId: string): Promise<Event> {
        return new Event("768bdbe9-6e65-47a4-ad80-60ac28a1a3f9", "A", 100)
    }
}