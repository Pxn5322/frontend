"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useEnterpriseDashboard from "../hooks/useEnterpriseDashboard";
import EnterpriseDashboardGrid from "./EnterpriseDashboardGrid";
import { Container } from "react-bootstrap";

export default function EnterpriseDashboardContent() {
    const {
        stats,
        loading,
    } = useEnterpriseDashboard();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!stats) {
        return (
            <Container className="py-4">
                <h5>No dashboard data available.</h5>
            </Container>
        );
    }

    return (
        <Container className="py-4" fluid>
            <h2 className="mb-4">Enterprise Dashboard</h2>
            <EnterpriseDashboardGrid stats={stats} />
        </Container>
    );
}