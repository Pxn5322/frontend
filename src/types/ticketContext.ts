import { Ticket } from "./tickets";

export interface TicketContextType {
    tickets: Ticket[];
    loading: boolean;
    loadTickets: () => Promise<void>;
    addTicket: (title: string, rawText: string) => Promise<void>;
    editTicket: (id: string, data: Partial<Ticket>) => Promise<void>;
    removeTicket: (id: string) => Promise<void>;
}