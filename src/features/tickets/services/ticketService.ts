import { Ticket } from "@/features/tickets/types/tickets";
import api from "../../../services/api";

export async function getTickets() {
    const res = await api.get("/api/tickets");
    return res.data;
}

export async function getTicket(id: string) {
    const res = await api.get(`/api/tickets/${id}`);
    return res.data;
}

export async function createTicket(data: { title: string; rawText: string; }) {
    const res = await api.post("/api/tickets", data);
    return res.data;
}

export async function updateTicket(id: string, data: Partial<Ticket>) {
    const res = await api.put(`/api/tickets/${id}`, data);
    return res.data;
}

export async function deleteTicket(id: string) {
    await api.delete(`/api/tickets/${id}`);
}