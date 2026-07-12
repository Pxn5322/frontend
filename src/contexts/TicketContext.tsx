"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as ticketService from "../services/ticketService";

const TicketContext = createContext<any>(null);

export function TicketProvider({ children }: any) {
    const [tickets, setTickets] = useState([]);

    async function loadTickets() {
        const data = await ticketService.getTickets();
        setTickets(data);
    }

    useEffect(() => {
        //loadTickets();
    }, []);

    async function addTicket(title: string, rawText: string) {
        const ticket = await ticketService.createTicket({
            title,
            rawText,
        });

        setTickets(prev => [ticket, ...prev]);
    }

    async function removeTicket(id: string) {
        await ticketService.deleteTicket(id);

        setTickets(prev =>
            prev.filter((t: any) => t.id !== id)
        );
    }

    return (
        <TicketContext.Provider value={{ tickets, loadTickets, addTicket, removeTicket }}>
            {children}
        </TicketContext.Provider>

    );
}

export function useTickets() {
    return useContext(TicketContext);
}