"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import TicketForm from "@/components/tickets/TicketForm";
import TicketCard from "@/components/tickets/TicketCard";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import useTicketActions from "@/hooks/useTicketActions";
import useTickets from "@/hooks/useTickets";

export default function TicketPage() {
    const { create } = useTicketActions();
    const { tickets, loading, } = useTickets();

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4">
                    <Row>
                        <Col lg={5}>
                            <TicketForm onSubmit={create} />
                        </Col>
                        <Col lg={7}>
                            {loading
                                ? <div className="text-center mt-5">
                                    <Spinner />
                                </div>
                                : tickets?.map(ticket => (
                                    <TicketCard key={ticket.id} ticket={ticket} />
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </DashboardLayout>
        </ProtectedRoute>
    );
}