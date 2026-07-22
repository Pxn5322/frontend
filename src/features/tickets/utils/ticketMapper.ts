import { Ticket } from "../types/tickets";
import { TicketDto } from "../types/ticketDto";

export function mapTicket(ticket: TicketDto): Ticket {
    return {
        id: ticket.id,
        title: ticket.title,
        rawText: ticket.rawText,
        priority: ticket.priority,
        sentiment: ticket.sentiment,
        status: ticket.status,
        tenantId: ticket.tenantId,
        createdById: ticket.createdById,
        createdBy: ticket.createdBy,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
    };
}