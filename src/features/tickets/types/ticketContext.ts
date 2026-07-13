import { Ticket } from "./tickets";

export interface TicketContextType {
    tickets: Ticket[];
    loading: boolean;
    search: string;
    statusFilter: string;
    priorityFilter: string;
    sort: "newest" | "oldest";
    currentPage: number;
    pageSize: number;
    setSearch: (value: string) => void;
    setStatusFilter: (status: string) => void;
    setPriorityFilter: (priority: string) => void;
    setSort(sort: "newest" | "oldest"): void;
    setCurrentPage(page: number): void;
    loadTickets: () => Promise<void>;
    addTicket: (title: string, rawText: string) => Promise<void>;
    editTicket: (id: string, data: Partial<Ticket>) => Promise<void>;
    removeTicket: (id: string) => Promise<void>;
}