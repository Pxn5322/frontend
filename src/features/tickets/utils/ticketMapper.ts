import { Ticket } from "../types/tickets";

export function mapTicket(ticket: any): Ticket {
    return {
        id: ticket.id,
        title: ticket.title,
        rawText: ticket.rawText,
        priority: ticket.priority,
        sentiment: ticket.sentiment,
        status: ticket.status,
        tenantId: ticket.tenantId,
        createdAt: ticket.createdAt,
    };
}