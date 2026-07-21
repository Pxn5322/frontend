"use client";

import { Row, Col, Card, } from "react-bootstrap";
import useEnterpriseDashboard from "@/features/enterprise/hooks/useEnterpriseDashboard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EnterpriseGuard from "@/components/auth/EnterpriseGuard";
import DashboardLayout from "@/components/DashboardLayout";

export default function EnterpriseDashboard() {
    const {
        stats,
        loading,
    } = useEnterpriseDashboard();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <EnterpriseGuard>
            <DashboardLayout>
                <h2 className="mb-4">Enterprise Dashboard</h2>
                <Row>
                    <Col md={3}>
                        <Card body>
                            <h5>Companies</h5>
                            <h1>{stats?.companies}</h1>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card body>
                            <h5>Users</h5>
                            <h1>{stats?.users}
                            </h1>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card body>
                            <h5>Tickets</h5>
                            <h1>{stats?.tickets}</h1>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card body>
                            <h5>Knowledge</h5>
                            <h1>{stats?.knowledge}</h1>
                        </Card>
                    </Col>
                </Row>
            </DashboardLayout>
        </EnterpriseGuard >
    );
}