"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import TicketForm from "@/features/tickets/components/TicketForm";
import { Container, Row, Col } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import useTicketActions from "@/features/tickets/hooks/useTicketActions";
import TicketList from "@/features/tickets/components/TicketList";
import SearchBar from "@/features/tickets/components/SearchBar";
import StatusFilter from "@/features/tickets/components/StatusFilter";
import PriorityFilter from "@/features/tickets/components/PriorityFilter";
import SortDropdown from "@/features/tickets/components/SortDropdown";

export default function TicketPage() {
    const { create } = useTicketActions();

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4">
                    <Row>
                        <Col lg={5}>
                            <TicketForm onSubmit={create} />
                        </Col>
                        <Col lg={7}>
                            <Row className="mb-4">
                                <Col lg={3}><SearchBar /></Col>
                                <Col lg={3}><StatusFilter /></Col>
                                <Col lg={3}><PriorityFilter /></Col>
                                <Col lg={3}><SortDropdown /></Col>
                            </Row>
                            <TicketList />
                        </Col>
                    </Row>
                </Container>
            </DashboardLayout>
        </ProtectedRoute>
    );
}