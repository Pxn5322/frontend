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
                    <Row >
                        <Button onClick={() => setShowCreate(true)}>
                            + New Ticket
                        </Button>
                    </Row>
                    <Row>
                        <Row className="mb-4">
                            <Col lg={3}><SearchBar /></Col>
                            <Col lg={3}><StatusFilter /></Col>
                            <Col lg={3}><PriorityFilter /></Col>
                            <Col lg={3}><SortDropdown /></Col>
                        </Row>
                        <TicketList />
                    </Row>
                </Container>
                <CreateTicketModal show={showCreate} onClose={() => setShowCreate(false)} onSubmit={create} />
            </DashboardLayout>
        </ProtectedRoute>
    );
}