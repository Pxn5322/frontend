"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import TicketDetails from "@/features/tickets/components/TicketDetails";
import { useParams } from "next/navigation";
import { Container } from "react-bootstrap";

export default function TicketDetailsPage() {
    const params = useParams();

    const ticketId = params.id as string;

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Container className="py-4" fluid>
                    <TicketDetails ticketId={ticketId} />
                </Container>
            </DashboardLayout>
        </ProtectedRoute>
    );
}