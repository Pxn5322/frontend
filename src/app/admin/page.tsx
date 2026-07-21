"use client";

import RoleGuard from "@/components/RoleGuard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <RoleGuard allowedRoles={["ADMIN"]}>
                    <div className="container mt-5">
                        <h1>Admin Dashboard</h1>
                        <p>Only administrators can view this page.</p>
                    </div>
                </RoleGuard>
            </DashboardLayout>

        </ProtectedRoute>
    );
}