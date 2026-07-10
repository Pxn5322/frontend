"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <h1>Dashboard</h1>
                <p>Welcome to Enterprise Nexus AI Powered Ticketing System</p>
            </DashboardLayout>
        </ProtectedRoute>
    );
}