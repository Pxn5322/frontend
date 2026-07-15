"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import DashboardStats from "@/features/dashboard/components/DashboardStats";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function DashboardPage() {
    const { platformUser } = useAuth();

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4">
                    <h2 className="mb-4">Welcome back</h2>
                    <DashboardStats />
                    <Card className="shadow-sm mt-4">
                        <Card.Body>
                            <Card.Title>Account Information</Card.Title>
                            <hr />
                            <Row>
                                <Col md={4}>
                                    <strong>Email</strong>
                                    <p>{platformUser?.email}</p>
                                </Col>
                                <Col md={4}>
                                    <strong>Role</strong>
                                    <p>{platformUser?.role}</p>
                                </Col>
                                <Col md={4}>
                                    <strong>Tenant</strong>
                                    <p>{platformUser?.tenantId}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </DashboardLayout>
        </ProtectedRoute>
    );
}