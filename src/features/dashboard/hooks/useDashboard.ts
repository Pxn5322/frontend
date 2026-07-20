"use client";

import { useEffect, useState } from "react";
import * as dashboardService from "../services/dashboardService";
import { DashboardData } from "../types/dashboard";

export default function useDashboard() {
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    async function refresh() {
        try {
            setLoading(true);
            const data = await dashboardService.getDashboard();
            setDashboard(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return {
        dashboard,
        loading,
        refresh,
    };
}