"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import UserTable from "@/features/users/components/UserTable";
import { Container } from "react-bootstrap";

export default function UsersPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4" fluid>
                    <h2>User Management</h2>
                    <hr />
                    <UserTable />
                </Container>
            </DashboardLayout>
        </ProtectedRoute>
    );
}