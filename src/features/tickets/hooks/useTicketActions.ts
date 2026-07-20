"use client";

import toast from "react-hot-toast";
import { useTicketContext } from "@/features/tickets/context/TicketContext";
import { Ticket } from "../types/tickets";

export default function useTicketActions() {
    const {
        addTicket,
        editTicket,
        removeTicket,
    } = useTicketContext();

    async function create(title: string, rawText: string, attachmentUrl?: string) {
        try {
            await addTicket(title, rawText, attachmentUrl);
            toast.success("Ticket created.");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to create ticket.");
        }
    }

    async function update(id: string, data: Partial<Ticket>, newFile?: File | null) {
        try {
            await editTicket(id, data, newFile);
            toast.success("Ticket updated.");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to update ticket.");
        }
    }

    async function remove(id: string, attachmentUrl?: string) {
        try {
            await removeTicket(id, attachmentUrl);
            toast.success("Ticket deleted.");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to delete ticket.");
        }
    }

    return {
        create,
        update,
        remove,
    };
}