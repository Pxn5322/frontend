import { Ticket } from "../types/tickets";

export function paginateTickets(tickets: Ticket[], currentPage: number, pageSize: number): Ticket[] {
    const start = (currentPage - 1) * pageSize;

    return tickets.slice(start, start + pageSize);
}