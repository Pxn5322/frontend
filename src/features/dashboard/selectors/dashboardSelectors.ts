import { Ticket } from "@/features/tickets/types/tickets";

export function getDashboardStats(tickets: Ticket[]) {
    return {
        total: tickets.length,
        open: tickets.filter(t => t.status === "OPEN").length,
        resolved: tickets.filter(t => t.status === "RESOLVED").length,
        inProgress: tickets.filter(t => t.status === "IN_PROGRESS").length,
        highPriority: tickets.filter(t => t.priority === "HIGH").length,
    };
}