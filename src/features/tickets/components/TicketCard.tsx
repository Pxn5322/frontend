"use client";

import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Ticket } from "@/features/tickets/types/tickets";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import TicketModal from "./TicketModal";
import useTicketActions from "@/features/tickets/hooks/useTicketActions";
import TicketDetailModal from "./TicketDetailModal";
import Link from "next/link";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";

interface Props {
    ticket: Ticket;
}

export default function TicketCard({ ticket, }: Props) {
    const { update, remove, } = useTicketActions();

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    async function handleDelete() {
        try {
            await remove(ticket.id);
            setShowDelete(false);
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
                            <h5>
                                <Link href={`/tickets/${ticket.id}`} className="text-decoration-none">
                                    {ticket.title}
                                </Link>
                            </h5>
                        </div>
                        <div>
                            <PriorityBadge priority={ticket.priority} />
                        </div>
                    </div>
                    <p className="mt-3">
                        {ticket.rawText.length > 120
                            ? ticket.rawText.substring(0, 120) + "..."
                            : ticket.rawText
                        }
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <StatusBadge status={ticket.status} />
                        <small>{new Date(ticket.createdAt).toLocaleString()}</small>
                    </div>
                    <div className="mt-3">
                        <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => setShowDetail(true)}>View</Button>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => setShowEdit(true)}>Edit</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => setShowDelete(true)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>

            <TicketDetailModal show={showDetail} ticket={ticket} onClose={() => setShowDetail(false)} />
            <TicketModal show={showEdit} ticket={ticket} onClose={() => setShowEdit(false)} onSave={update} />
            <DeleteConfirmModal show={showDelete} title={ticket.title} onClose={() => setShowDelete(false)} onConfirm={handleDelete} />
        </>
    );
}