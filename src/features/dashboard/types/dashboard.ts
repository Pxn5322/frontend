import { Ticket } from "@/features/tickets/types/tickets";

export interface DashboardData {
    totalTickets: number;
    openTickets: number;
    progressTickets: number;
    resolvedTickets: number;
    highPriorityTickets: number;
    criticalPriorityTickets: number;
    knowledgeCount: number;
    recentTickets: Ticket[];
}