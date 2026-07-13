"use client";
import { useTicketContext } from "@/contexts/TicketContext";

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