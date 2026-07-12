"use client";

import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Ticket } from "@/types/tickets";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import TicketModal from "./TicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import useTicketActions from "@/hooks/useTicketActions";
import useTickets from "@/hooks/useTickets";

interface Props {
    ticket: Ticket;
}

export default function TicketCard({ ticket, }: Props) {
    const { update, remove, } = useTicketActions();
    const { refresh } = useTickets();

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    async function handleDelete() {
        try {
            await remove(ticket.id);
            setShowDelete(false);
            await refresh();
        } catch {
            toast.error("Delete failed.");
        }
    }

    return (
        <>
            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>{ticket.title}</h5>
                        </div>
                        <div>
                            <PriorityBadge priority={ticket.priority} />
                        </div>
                    </div>
                    <p className="mt-3">{ticket.rawText}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <StatusBadge status={ticket.status} />
                        <small>{new Date(ticket.createdAt).toLocaleString()}</small>
                    </div>
                    <div className="mt-3">
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => setShowEdit(true)}>Edit</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => setShowDelete(true)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>

            <TicketModal show={showEdit} ticket={ticket} onClose={() => setShowEdit(false)} onSave={update} />
            <DeleteTicketModal show={showDelete} title={ticket.title} onClose={() => setShowDelete(false)} onDelete={handleDelete} />
        </>
    );
}