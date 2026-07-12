"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {

    const { platformUser } = useAuth();

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="container mt-5">
                    <h2>Welcome</h2>
                    <hr />
                    <p>Email :{" "}{platformUser?.email}</p>
                    <p>Role :{" "}{platformUser?.role}</p>
                    <p>Tenant :{" "}{platformUser?.tenantId}</p>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}