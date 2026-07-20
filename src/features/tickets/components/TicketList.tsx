"use client";

import TicketCard from "./TicketCard";
import useVisibleTickets from "../hooks/useVisibleTickets";
import PaginationBar from "../../../components/ui/PaginationBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

export default function TicketList() {
    const {
        currentPage,
        pageSize,
        setCurrentPage,
        visibleTickets,
        loading,
        totalTickets,
    } = useVisibleTickets();

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (visibleTickets.length === 0) {
        return (
            <EmptyState message="No tickets found." />
        );
    }

    return (
        <>
            <PaginationBar currentPage={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage} total={totalTickets} />
            {visibleTickets?.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </>
    );
}