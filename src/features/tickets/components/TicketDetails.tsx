"use client";

import { useEffect, useState } from "react";
import { Card, Spinner, Badge, Button, } from "react-bootstrap";
import { Ticket } from "../types/tickets";
import * as ticketService from "../services/ticketService";

interface Props {
    ticketId: string;
}

export default function TicketDetails({ ticketId, }: Props) {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await ticketService.getTicket(ticketId);
                setTicket(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (ticketId) {
            load();
        }
    }, [ticketId]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner />
            </div>
        );
    }

    if (!ticket) {
        return (
            <Card>
                <Card.Body>Ticket not found.</Card.Body>
            </Card>
        );
    }

    return (
        <Card className="shadow">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <h2>{ticket.title}</h2>
                    </div>
                    <div>
                        <Badge bg="primary">{ticket.status}</Badge>
                    </div>
                </div>
                <hr />
                <h5>Description</h5>
                <p>{ticket.rawText}</p>
                <hr />
                <p>
                    <strong>Priority</strong>
                    {" "}{ticket.priority}
                </p>
                <p>
                    <strong>Sentiment</strong>{" "}{ticket.sentiment}
                </p>
                <p>
                    <strong>Created</strong>{" "}{new Date(ticket.createdAt).toLocaleString()}
                </p>
                <Button>Edit</Button>
            </Card.Body>
        </Card>
    );
}