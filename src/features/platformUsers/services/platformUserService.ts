import api from "@/services/api";
import { UpdatePlatformUserRequest } from "../types/updatePlatformUser";

export async function getPlatformUsers() {
    const response = await api.get("/api/platform-users");
    return response.data;
}

export async function updatePlatformUser(id: string, data: UpdatePlatformUserRequest) {
    const response = await api.put(`/api/platform-users/${id}`, data);
    return response.data;
}

export async function changePassword(id: string, password: string) {
    const response = await api.put(`/api/platform-users/${id}/password`, { password, });
    return response.data;
}


export async function deletePlatformUser(id: string) {
    const response = await api.delete(`/api/platform-users/${id}`);
    return response.data;
}