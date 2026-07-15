"use client";

import { Modal } from "react-bootstrap";
import KnowledgeForm from "./KnowledgeForm";

interface Props {
    show: boolean;
    onClose: () => void;
    onSubmit: (title: string, content: string) => Promise<void>;
}

export default function CreateKnowledgeModal({ show, onClose, onSubmit, }: Props) {
    async function handleCreate(title: string, content: string) {
        await onSubmit(title, content);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <KnowledgeForm onSubmit={handleCreate} />
            </Modal.Body>
        </Modal>
    );
}