"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";

export default function AgentPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <RoleGuard allowedRoles={["AGENT"]}>
                    <div className="container mt-5">
                        <h1>Agent Dashboard</h1>
                    </div>
                </RoleGuard>
            </DashboardLayout>
        </ProtectedRoute>
    );
}