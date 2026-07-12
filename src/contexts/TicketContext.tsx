"use client";

import { createContext, useContext, useEffect, useState, ReactNode, } from "react";
import { Ticket } from "@/types/tickets";
import * as ticketService from "@/services/ticketService";
import { useAuth } from "./AuthContext";

interface TicketContextType {
    tickets: Ticket[];
    loading: boolean;
    loadTickets: () => Promise<void>;
    addTicket: (title: string, rawText: string) => Promise<void>;
    editTicket: (id: string, data: Partial<Ticket>) => Promise<void>;
    removeTicket: (id: string) => Promise<void>;
}

const TicketContext = createContext<TicketContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function TicketProvider({ children, }: Props) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const { firebaseUser, loading: authLoading } = useAuth();

    async function loadTickets() {
        try {
            setLoading(true);
            const data = await ticketService.getTickets();
            setTickets(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!authLoading && firebaseUser) {
            loadTickets();
        }
    }, [authLoading, firebaseUser]);

    async function addTicket(title: string, rawText: string) {
        const ticket = await ticketService.createTicket({ title, rawText, });
        setTickets(prev => [ticket, ...prev,]);
    }

    async function editTicket(id: string, data: Partial<Ticket>) {
        const updated = await ticketService.updateTicket(id, data);
        setTickets(prev => prev.map(ticket => ticket.id === id ? updated : ticket));
    }

    async function removeTicket(id: string) {
        await ticketService.deleteTicket(id);
        setTickets(prev => prev.filter(ticket => ticket.id !== id));
    }

    return (
        <TicketContext.Provider value={{ tickets, loading, loadTickets, addTicket, editTicket, removeTicket, }}>
            {children}
        </TicketContext.Provider>
    );
}

export function useTickets() {
    const context = useContext(TicketContext);

    if (!context) {
        throw new Error("useTickets must be used inside TicketProvider");
    }

    return context;
}