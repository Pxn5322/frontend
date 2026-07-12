import api from "./api";

export async function getTickets() {
    const res = await api.get("/tickets");
    return res.data;
}

export async function getTicket(id: string) {
    const res = await api.get(`/tickets/${id}`);
    return res.data;
}

export async function createTicket(data: {
    title: string;
    rawText: string;
}) {
    const res = await api.post("/tickets", data);
    return res.data;
}

export async function updateTicket(id: string, data: any) {
    const res = await api.put(`/tickets/${id}`, data);
    return res.data;
}

export async function deleteTicket(id: string) {
    await api.delete(`/tickets/${id}`);
}