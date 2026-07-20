import api from "@/services/api";
import { Tenant } from "../types/tenant";

export async function getTenants() {
    const response = await api.get<Tenant[]>("/api/tenants");
    return response.data;
}

export async function createTenant(companyName: string) {
    const response = await api.post<Tenant>("/api/tenants", { companyName, });
    return response.data;
}

export async function updateTenant(id: string, companyName: string) {
    const response = await api.put<Tenant>(`/api/tenants/${id}`, { companyName, });
    return response.data;
}

export async function deleteTenant(id: string) {
    await api.delete(`/api/tenants/${id}`);
}