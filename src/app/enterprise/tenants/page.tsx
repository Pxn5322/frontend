"use client";

import { Button, Col, Container, Row, } from "react-bootstrap";
import { useState, } from "react";
import CreateCompanyModal from "@/features/tenants/components/CreateCompanyModal";
import DashboardLayout from "@/components/DashboardLayout";
import CompanyList from "@/features/tenants/components/CompanyList";
import EnterpriseGuard from "@/components/auth/EnterpriseGuard";
import useCompanyActions from "@/features/tenants/hooks/useCompanyActions";

export default function EnterpriseTenants() {
    const { create } = useCompanyActions();
    const [showCreate, setShowCreate] = useState(false);

    return (
        <EnterpriseGuard>
            <DashboardLayout>
                <Container className="py-4" fluid>
                    <Row className="page-title text-center justify-content-center">
                        <Col lg={8}>
                            <h1 className="fw-bold display-5">Companies</h1>
                            <Button size="lg" className="fw-bold px-4 py-2 mt-2 shadow-sm" onClick={() => setShowCreate(true)}>
                                + Create Company
                            </Button>
                        </Col>
                    </Row>
                    <Row className="my-4">
                        <CompanyList />
                    </Row>
                </Container>
                <CreateCompanyModal show={showCreate} onClose={() => setShowCreate(false)} onSubmit={create} />
            </DashboardLayout>
        </EnterpriseGuard >
    );
}