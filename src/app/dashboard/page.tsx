"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Spinner from "react-bootstrap/Spinner";
import useDashboard from "@/features/dashboard/hooks/useDashboard";
import DashboardGrid from "@/features/dashboard/components/DashboardGrid";
import RecentTickets from "@/features/dashboard/components/RecentTickets";
import QuickActions from "@/features/dashboard/components/QuickActions";
import { Container } from "react-bootstrap";

export default function DashboardPage() {
    const {
        dashboard,
        loading,
    } = useDashboard();

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4" fluid>
                    <h2 className="mb-4">Dashboard</h2>
                    {loading && (
                        <div className="text-center">
                            <Spinner />
                        </div>
                    )}
                    {!loading && dashboard && (
                        <>
                            <DashboardGrid dashboard={dashboard} />
                            <RecentTickets tickets={dashboard.recentTickets} />
                            <QuickActions />
                        </>
                    )}
                </Container>
            </DashboardLayout>
        </ProtectedRoute>
    );
}