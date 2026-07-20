import api from "@/services/api";
import { DashboardData } from "../types/dashboard";

export async function getDashboard(): Promise<DashboardData> {
    const res = await api.get("/api/dashboard");
    return res.data;
}