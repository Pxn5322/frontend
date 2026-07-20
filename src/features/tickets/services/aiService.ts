import api from "@/services/api";
import { AIAnalysis } from "../types/aiAnalysis";

export async function generateReply(ticketId: string) {
    const res = await api.post(`/api/tickets/${ticketId}/reply`);
    return res.data.reply;
}

export async function ticketAnalysis(id: string): Promise<AIAnalysis> {
    const res = await api.post(`/api/tickets/${id}/analyze`);
    return res.data;
}