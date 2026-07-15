import api from "@/services/api";
import { Knowledge } from "../types/knowledge";

export async function getKnowledge(): Promise<Knowledge[]> {
    const res = await api.get("/api/knowledge");
    return res.data;
}

export async function getKnowledgeArticle(id: string): Promise<Knowledge> {
    const res = await api.get(`/api/knowledge/${id}`);
    return res.data;
}

export async function createKnowledge(data: { title: string; content: string; }) {
    const res = await api.post("/api/knowledge", data);
    return res.data;
}

export async function updateKnowledge(id: string, data: Partial<Knowledge>) {
    const res = await api.put(`/api/knowledge/${id}`, data);
    return res.data;
}

export async function deleteKnowledge(id: string) {
    await api.delete(`/api/knowledge/${id}`);
}