"use client";

import { Modal, Badge, Row, Col, Spinner, Button, Image, Card } from "react-bootstrap";
import { Ticket } from "../types/tickets";
import AIAnalysisCard from "./AIAnalysisCard";
import { useState } from "react";
import { ticketAnalysis } from "../services/aiService";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
    show: boolean;
    ticket: Ticket | null;
    onClose: () => void;
}

export default function TicketDetailModal({ show, ticket, onClose }: Props) {
    const { isUser } = useAuth();

    const [summary, setSummary] = useState("");
    const [suggestedReply, setSuggestedReply] = useState("");
    const [confidence, setConfidence] = useState<number>();
    const [analyzed, setAnalyzed] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);

    async function handleGenerateAI() {
        if (!ticket) return;
        try {
            setLoadingAI(true);
            const result = await ticketAnalysis(ticket.id);
            setSummary(result.summary);
            setSuggestedReply(result.suggestedReply);
            setConfidence(result.confidence);
            setAnalyzed(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAI(false);
        }
    }

    if (!ticket) return null;

    const url = ticket.attachmentUrl || "";
    const cleanUrl = decodeURIComponent(url).split("?")[0].toLowerCase();
    const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(cleanUrl);
    const isPdf = /\.pdf$/i.test(cleanUrl);
    const fileName = cleanUrl.split("/").pop() ?? "Attachment";

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Ticket Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{ticket.title}</h4>
                <hr />
                <Row className="mb-3">
                    <Col md={4}>
                        <strong>Status</strong>
                    </Col>
                    <Col>
                        <StatusBadge status={ticket.status} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <strong>Priority</strong>
                    </Col>
                    <Col>
                        <PriorityBadge priority={ticket.priority} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <strong>Sentiment</strong>
                    </Col>
                    <Col>
                        <Badge bg="secondary">{ticket.sentiment}</Badge>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <strong>Created</strong>
                    </Col>
                    <Col>
                        {new Date(ticket.createdAt).toLocaleString()}
                    </Col>
                </Row>
                <hr />
                <h5>Description</h5>
                <p style={{ whiteSpace: "pre-wrap" }}>{ticket.rawText}</p>
                <hr />
                <Card className="mt-4 shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <strong>Attachment</strong>
                        {isImage && <Badge bg="success">IMAGE</Badge>}
                        {isPdf && <Badge bg="danger">PDF</Badge>}
                    </Card.Header>
                    <Card.Body>
                        {ticket.attachmentUrl
                            ? ((() => {
                                if (isImage) {
                                    return (
                                        <div>
                                            <Image alt="ticket-attachment" src={ticket.attachmentUrl} fluid rounded thumbnail style={{ maxHeight: "350px", objectFit: "contain", }} />
                                            <div className="d-flex gap-2 mt-3">
                                                <Button as="a" href={ticket.attachmentUrl} target="_blank" rel="noopener noreferrer" variant="outline-primary">
                                                    Open Image
                                                </Button>
                                                <Button as="a" href={ticket.attachmentUrl} download variant="outline-success">
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div>
                                        <p>📄 {fileName}</p>
                                        <div className="d-flex gap-2">
                                            <Button as="a" href={ticket.attachmentUrl} target="_blank" rel="noopener noreferrer" variant="outline-primary">
                                                Open
                                            </Button>
                                            <Button as="a" href={ticket.attachmentUrl} download variant="outline-success">
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })())
                            : (<div className="text-center text-muted py-4">
                                📎
                                <br />
                                No attachment uploaded.
                            </div>)}
                    </Card.Body>
                </Card>
                {!isUser && <Button className="mt-3" onClick={handleGenerateAI} disabled={loadingAI}>
                    {loadingAI
                        ? (<><Spinner size="sm" className="me-2" />Thinking...</>)
                        : "✨ Generate AI Analysis"
                    }
                </Button>}
                {analyzed && <AIAnalysisCard
                    loading={loadingAI}
                    analyzed={analyzed}
                    summary={summary}
                    suggestedReply={suggestedReply}
                    confidence={confidence}
                    onGenerate={handleGenerateAI}
                />}
            </Modal.Body>
        </Modal>
    );
}