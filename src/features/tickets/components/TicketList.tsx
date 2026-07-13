"use client";

import { Alert, Spinner } from "react-bootstrap";
import TicketCard from "./TicketCard";
import useVisibleTickets from "../hooks/useVisibleTickets";
import PaginationBar from "./PaginationBar";

export default function TicketList() {
    const {
        visibleTickets,
        loading,
        totalTickets,
    } = useVisibleTickets();

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner />
            </div>
        );
    }

    if (visibleTickets.length === 0) {
        return (
            <Alert variant="secondary">
                No tickets found.
            </Alert>
        );
    }

    return (
        <>
            {visibleTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
            <PaginationBar totalTickets={totalTickets} />
        </>
    );
}