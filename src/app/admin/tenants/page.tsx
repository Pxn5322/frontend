"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TenantProvider } from "@/features/tenants/context/TenantProvider";
import TenantList from "@/features/tenants/components/TenantList";
import { Container } from "react-bootstrap";

export default function AdminTenantsPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4" fluid>
                    <h2>Tenant Management</h2>
                    <hr />
                    <TenantProvider>
                        <TenantList />
                    </TenantProvider>
                </Container>
            </DashboardLayout>
        </ProtectedRoute>
    );
}