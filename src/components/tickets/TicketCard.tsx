"use client";

import { Card, Button } from "react-bootstrap";
import { Ticket } from "@/types/tickets";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

interface Props {
    ticket: Ticket;
}

export default function TicketCard({ ticket, }: Props) {
    return (
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
                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                    <Button variant="outline-danger" size="sm" >Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}