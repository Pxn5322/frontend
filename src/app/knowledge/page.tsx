"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import { Container, Row, Col, Button } from "react-bootstrap";
import KnowledgeList from "@/features/knowledge/components/KnowledgeList";
import useKnowledgeActions from "@/features/knowledge/hooks/useKnowledgeActions";
import { useState } from "react";
import CreateKnowledgeModal from "@/features/knowledge/components/CreateKnowledgeModal";
import SortKnowledge from "@/features/knowledge/components/SortKnowledge";
import SearchKnowledge from "@/features/knowledge/components/SearchKnowledge";

export default function KnowledgePage() {
    const { create } = useKnowledgeActions();
    const [showCreate, setShowCreate] = useState(false);

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4">
                    <Row className="page-title text-center justify-content-center">
                        <Col lg={8}>
                            <h1 className="fw-bold display-5">Knowledge Base</h1>
                            <Button size="lg" className="fw-bold px-4 py-2 mt-2 shadow-sm" onClick={() => setShowCreate(true)}>
                                + New Knowledge
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Row className="my-4">
                            <Col className="my-1" lg={6}><SearchKnowledge /></Col>
                            <Col className="my-1" lg={6}><SortKnowledge /></Col>
                        </Row>
                        <KnowledgeList />
                    </Row>
                </Container>
                <CreateKnowledgeModal show={showCreate} onClose={() => setShowCreate(false)} onSubmit={create} />
            </DashboardLayout>
        </ProtectedRoute>
    );
}