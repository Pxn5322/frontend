"use client";

import { useEffect } from "react";
import { useTicketContext } from "@/contexts/TicketContext";

export default function useTickets() {
    const {
        tickets,
        loading,
        loadTickets,
    } = useTicketContext();

    useEffect(() => {
        loadTickets();
    }, []);

    return {
        tickets,
        loading,
        refresh: loadTickets,
    };
}