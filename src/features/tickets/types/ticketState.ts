import { SortOption } from "../utils/ticketSort";
import { Ticket } from "./tickets";

export interface TicketState {
    tickets: Ticket[];
    loading: boolean;
    search: string;
    statusFilter: string;
    priorityFilter: string;
    sort: SortOption;
    currentPage: number;
    pageSize: number;
}