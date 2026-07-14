"use client";

import { Modal } from "react-bootstrap";
import TicketForm from "./TicketForm";

interface Props {
    show: boolean;
    onClose: () => void;
    onSubmit: (title: string, rawText: string) => Promise<void>;
}

export default function CreateTicketModal({ show, onClose, onSubmit, }: Props) {
    async function handleCreate(title: string, rawText: string) {
        await onSubmit(title, rawText);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TicketForm onSubmit={handleCreate} />
            </Modal.Body>
        </Modal>
    );
}