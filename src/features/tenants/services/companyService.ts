import api from "@/services/api";
import { Company } from "../types/company";

export interface CompanyRegistration {
    companyName: string;
    companyCode: string;
    adminName: string;
    adminEmail: string;
    adminPassword: string;
}

export async function registerCompany(data: CompanyRegistration) {
    const res = await api.post("/api/tenants/register-company", data);
    return res.data;
}

export async function getCompanies() {
    const res = await api.get<Company[]>("/api/tenants");
    return res.data;
}

export async function updateCompany(id: string, data: Partial<Company>) {
    const response = await api.put<Company>(`/api/tenants/${id}`, data);
    return response.data;
}

export async function deleteCompany(id: string) {
    await api.delete(`/api/tenants/${id}`);
}