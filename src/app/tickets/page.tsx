"use client";

import { useTickets } from "@/contexts/TicketContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import TicketForm from "@/components/tickets/TicketForm";
import TicketCard from "@/components/tickets/TicketCard";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/DashboardLayout";

export default function TicketPage() {
    const { tickets, loading, addTicket, loadTickets, } = useTickets();

    async function handleCreateTicket(title: string, rawText: string) {
        try {
            await addTicket(title, rawText);
            toast.success("Ticket created successfully.");
            await loadTickets();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Unable to create ticket.");
        }
    }

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4">
                    <Row>
                        <Col lg={5}>
                            <TicketForm onSubmit={handleCreateTicket} />
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