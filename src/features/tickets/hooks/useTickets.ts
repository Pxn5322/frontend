"use client";
import { useTicketContext } from "@/features/tickets/context/TicketContext";

export default function useTickets() {
    const {
        tickets,
        loading,
        loadTickets,
    } = useTicketContext();

    return {
        tickets,
        loading,
        refresh: loadTickets,
    };
}