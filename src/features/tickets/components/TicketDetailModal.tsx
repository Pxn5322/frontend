"use client";

import { Modal, Badge, Row, Col } from "react-bootstrap";
import { Ticket } from "../types/tickets";
import AIAnalysisCard from "./AIAnalysisCard";

interface Props {
    show: boolean;
    ticket: Ticket | null;
    onClose: () => void;
}

export default function TicketDetailModal({ show, ticket, onClose }: Props) {
    if (!ticket) return null;

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
                        <Badge bg="primary">{ticket.status}</Badge>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <strong>Priority</strong>
                    </Col>
                    <Col>
                        <Badge bg="danger">{ticket.priority}</Badge>
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

                <AIAnalysisCard analyzed={false} />
            </Modal.Body>
        </Modal>
    );
}