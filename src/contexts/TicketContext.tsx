"use client";

import { createContext, useContext, useEffect, ReactNode, useReducer, } from "react";
import { Ticket } from "@/features/tickets/types/tickets";
import * as ticketService from "@/features/tickets/services/ticketService";
import { useAuth } from "./AuthContext";
import { TicketContextType } from "@/features/tickets/types/ticketContext";
import { initialTicketState, ticketReducer } from "@/features/tickets/reducers/ticketReducer";

const TicketContext = createContext<TicketContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function TicketProvider({ children, }: Props) {
    const [state, dispatch] = useReducer(ticketReducer, initialTicketState);
    const { firebaseUser, loading: authLoading } = useAuth();

    async function loadTickets() {
        try {
            dispatch({ type: "SET_LOADING", payload: true, });
            const data = await ticketService.getTickets();
            dispatch({ type: "SET_TICKETS", payload: data, });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            dispatch({ type: "SET_LOADING", payload: false, });
        }
    }

    useEffect(() => {
        if (!authLoading && firebaseUser) {
            loadTickets();
        } else {
            dispatch({ type: "SET_TICKETS", payload: [] });
        }
    }, [authLoading, firebaseUser]);

    async function addTicket(title: string, rawText: string) {
        const ticket = await ticketService.createTicket({ title, rawText, });
        dispatch({ type: "ADD_TICKET", payload: ticket, });
    }

    async function editTicket(id: string, data: Partial<Ticket>) {
        const updated = await ticketService.updateTicket(id, data);
        dispatch({ type: "UPDATE_TICKET", payload: updated, });
    }

    async function removeTicket(id: string) {
        await ticketService.deleteTicket(id);
        dispatch({ type: "DELETE_TICKET", payload: id, });
    }

    function setSearch(search: string) {
        dispatch({ type: "SET_SEARCH", payload: search, });
    }

    function setStatusFilter(status: string) {
        dispatch({ type: "SET_STATUS_FILTER", payload: status, });
    }

    function setPriorityFilter(priority: string) {
        dispatch({ type: "SET_PRIORITY_FILTER", payload: priority, });
    }

    function setSort(sort: "newest" | "oldest") {
        dispatch({ type: "SET_SORT", payload: sort, });
    }

    function setCurrentPage(page: number) {
        dispatch({ type: "SET_CURRENT_PAGE", payload: page, });
    }

    return (
        <TicketContext.Provider value={{
            tickets: state.tickets,
            loading: state.loading,
            search: state.search,
            statusFilter: state.statusFilter,
            priorityFilter: state.priorityFilter,
            sort: state.sort,
            currentPage: state.currentPage,
            pageSize: state.pageSize,
            setSearch,
            setStatusFilter,
            setPriorityFilter,
            setSort,
            setCurrentPage,
            loadTickets,
            addTicket,
            editTicket,
            removeTicket,
        }}>
            {children}
        </TicketContext.Provider>
    );
}

export function useTicketContext() {
    const context = useContext(TicketContext);

    if (!context) {
        throw new Error("useTickets must be used inside TicketProvider");
    }

    return context;
}