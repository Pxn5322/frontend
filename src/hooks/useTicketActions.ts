"use client";

import toast from "react-hot-toast";
import { useTicketContext } from "@/contexts/TicketContext";

export default function useTicketActions() {
    const {
        addTicket,
        editTicket,
        removeTicket,
        loadTickets,
    } = useTicketContext();

    async function create(title: string, rawText: string) {
        try {
            await addTicket(title, rawText);
            toast.success("Ticket created.");
            await loadTickets();
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to create ticket.");
        }
    }

    async function update(id: string, title: string, rawText: string) {
        try {
            await editTicket(id, { title, rawText });
            toast.success("Ticket updated.");
            await loadTickets();
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to update ticket.");
        }
    }

    async function remove(id: string) {
        try {
            await removeTicket(id);
            toast.success("Ticket deleted.");
            await loadTickets();
        }
        catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to delete ticket.");
        }
    }

    return {
        create,
        update,
        remove,
    };
}