"use client";

import { useEffect, useState } from "react";
import { Card, Badge, Button, Form, Spinner, } from "react-bootstrap";
import { Ticket } from "../types/tickets";
import * as ticketService from "../services/ticketService";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import * as aiService from "../services/aiService";
import toast from "react-hot-toast";

interface Props {
    ticketId: string;
}

export default function TicketDetails({ ticketId, }: Props) {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [reply, setReply] = useState("");
    const [loadingReply, setLoadingReply] = useState(false);
    const [loading, setLoading] = useState(true);

    async function generateAIReply() {
        try {
            setLoadingReply(true);
            const result = await aiService.generateReply(ticketId);
            setReply(result);
        } catch {
            toast.error("Unable to generate reply.");
        } finally {
            setLoadingReply(false);
        }

    }

    async function copyReply() {
        if (!reply) return;

        await navigator.clipboard.writeText(reply);
        toast.success("Copied.");
    }

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
            <LoadingSpinner />
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
                    <strong>Priority</strong>{" "}{ticket.priority}
                </p>
                <p>
                    <strong>Sentiment</strong>{" "}{ticket.sentiment}
                </p>
                <p>
                    <strong>Created</strong>{" "}{new Date(ticket.createdAt).toLocaleString()}
                </p>
                <hr />
                <h4>🤖 AI Assistant</h4>
                <Button className="mb-3" onClick={generateAIReply} disabled={loadingReply}>
                    {loadingReply
                        ? (<><Spinner size="sm" className="me-2" />Thinking...</>)
                        : "✨ Generate AI Reply"
                    }
                </Button>
                <Card className="mt-4 border-primary">
                    <Card.Body>
                        <h5>AI Suggested Reply</h5>
                        <Form.Control as="textarea" rows={10} value={reply} readOnly />
                        <div className="mt-3">
                            <Button variant="secondary" onClick={copyReply} disabled={!reply}>Copy</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    );
}