"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Container, Row, Col, Button } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import useTicketActions from "@/features/tickets/hooks/useTicketActions";
import TicketList from "@/features/tickets/components/TicketList";
import SearchBar from "@/features/tickets/components/SearchBar";
import StatusFilter from "@/features/tickets/components/StatusFilter";
import PriorityFilter from "@/features/tickets/components/PriorityFilter";
import SortDropdown from "@/features/tickets/components/SortDropdown";
import { useState } from "react";
import CreateTicketModal from "@/features/tickets/components/CreateTicketModal";

export default function TicketPage() {
    const { create } = useTicketActions();
    const [showCreate, setShowCreate] = useState(false);

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4">
                    <Row className="page-title text-center justify-content-center">
                        <Col lg={8}>
                            <h1 className="fw-bold display-5">Tickets</h1>
                            <Button size="lg" className="fw-bold px-4 py-2 mt-2 shadow-sm" onClick={() => setShowCreate(true)}>
                                + New Ticket
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Row className="my-4">
                            <Col className="my-1" lg={3}><SearchBar /></Col>
                            <Col className="my-1" lg={3}><StatusFilter /></Col>
                            <Col className="my-1" lg={3}><PriorityFilter /></Col>
                            <Col className="my-1" lg={3}><SortDropdown /></Col>
                        </Row>
                        <TicketList />
                    </Row>
                </Container>
                <CreateTicketModal show={showCreate} onClose={() => setShowCreate(false)} onSubmit={create} />
            </DashboardLayout>
        </ProtectedRoute>
    );
}