"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import TicketDetails from "@/features/tickets/components/TicketDetails";
import { useParams } from "next/navigation";

export default function TicketDetailsPage() {
    const params = useParams();

    const ticketId = params.id as string;

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <TicketDetails ticketId={ticketId} />
            </DashboardLayout>
        </ProtectedRoute>
    );
}