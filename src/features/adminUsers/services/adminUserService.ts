import api from "@/services/api";
import { AdminUser } from "../types/adminUser";

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "AGENT" | "USER";
}

export async function getUsers() {
    const res = await api.get<AdminUser[]>("/api/admin-users");
    return res.data;
}

export async function createUser(data: CreateUserRequest) {
    const res = await api.post<AdminUser>("/api/admin-users", data);
    return res.data;
}

export async function updateUser(id: string, data: Partial<AdminUser>) {
    const res = await api.put<AdminUser>(`/api/admin-users/${id}`, data);
    return res.data;
}

export async function changePassword(id: string, password: string) {
    return api.put(`/api/admin-users/${id}/password`, { password, });
}

export async function deleteUser(id: string) {
    return api.delete(`/api/admin-users/${id}`);
}