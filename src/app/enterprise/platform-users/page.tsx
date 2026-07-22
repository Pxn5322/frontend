"use client";

import DashboardLayout from "@/components/DashboardLayout";
import EnterpriseGuard from "@/components/auth/EnterpriseGuard";
import { Container, Row, Col, } from "react-bootstrap";
import PlatformUserList from "@/features/platformUsers/components/PlatformUserList";

export default function PlatformUsersPage() {
    return (
        <EnterpriseGuard>
            <DashboardLayout>
                <Container className="py-4" fluid>
                    <Row className="page-title text-center justify-content-center">
                        <Col lg={8}>
                            <h1 className="fw-bold display-5">Platform Users</h1>
                            <p className="text-muted">
                                Manage every user across all companies.
                            </p>
                        </Col>
                    </Row>
                    <Row className="my-4">
                        <PlatformUserList />
                    </Row>
                </Container>
            </DashboardLayout>
        </EnterpriseGuard>
    );
}