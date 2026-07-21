import api from "@/services/api";
import { PlatformUser } from "../types/user";

export async function getUsers(): Promise<PlatformUser[]> {
    const response = await api.get("/api/users");
    return response.data;
}

export async function updateRole(id: string, role: "ADMIN" | "AGENT") {
    const response = await api.put(`/api/users/${id}/role`, { role, });
    return response.data;
}