import api from "@/services/api";

export interface EnterpriseDashboard {
    companies: number;
    users: number;
    tickets: number;
    knowledge: number;
}

export async function getDashboard() {
    const res = await api.get<EnterpriseDashboard>("/api/enterprise/dashboard");
    return res.data;
}