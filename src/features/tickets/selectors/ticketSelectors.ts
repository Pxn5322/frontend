import { Ticket } from "../types/tickets";

export function filterBySearch(tickets: Ticket[], search: string): Ticket[] {
    if (!search.trim()) {
        return tickets;
    }

    const keyword = search.toLowerCase();

    return tickets.filter(ticket =>
        ticket.title.toLowerCase().includes(keyword) ||
        ticket.rawText.toLowerCase().includes(keyword)
    );
}

export function filterByStatus(tickets: Ticket[], status: string): Ticket[] {
    if (!status) {
        return tickets;
    }

    return tickets.filter(ticket =>
        ticket.status === status
    );
}

export function filterByPriority(tickets: Ticket[], priority: string): Ticket[] {
    if (!priority) {
        return tickets;
    }

    return tickets.filter(ticket =>
        ticket.priority === priority
    );
}