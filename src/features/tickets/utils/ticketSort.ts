import { Ticket } from "../types/tickets";

export type SortOption =
    | "newest"
    | "oldest";

export function sortTickets(tickets: Ticket[], option: SortOption): Ticket[] {
    const sorted = [...tickets];

    switch (option) {
        case "oldest":
            return sorted.sort((a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
        default:
            return sorted.sort((a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
    }
}