"use client";

import { useEffect, useState } from "react";
import { EnterpriseDashboard, getDashboard, } from "../services/enterpriseService";

export default function useEnterpriseDashboard() {
    const [stats, setStats] = useState<EnterpriseDashboard>();
    const [loading, setLoading] = useState(true);

    async function refresh() {
        try {
            setLoading(true);
            const data = await getDashboard();
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return {
        stats,
        loading,
        refresh,
    };
}