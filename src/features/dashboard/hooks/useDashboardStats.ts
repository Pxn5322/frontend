"use client";

import { useTicketContext } from "@/contexts/TicketContext";
import { getDashboardStats } from "../selectors/dashboardSelectors";

export default function useDashboardStats() {
    const { tickets } = useTicketContext();
    return getDashboardStats(tickets);
}