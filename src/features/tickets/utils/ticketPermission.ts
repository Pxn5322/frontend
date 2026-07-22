import { PlatformUser } from "@/types/platformUser";
import { Ticket } from "../types/tickets";

export function canEditTicket(user: PlatformUser, ticket: Ticket) {
    if (user.role === "ADMIN" || user.role === "AGENT" || user.role === "ENTERPRISE") {
        return true;
    }

    return ticket.createdById === user.id;
}

export function canDeleteTicket(user: PlatformUser, ticket: Ticket) {
    if (user.role === "ADMIN" || user.role === "AGENT" || user.role === "ENTERPRISE") {
        return true;
    }

    return ticket.createdById === user.id;
}