"use client";

import { Modal, Button, } from "react-bootstrap";

interface Props {
    show: boolean;
    title: string;
    onClose: () => void;
    onDelete: () => Promise<void>;
}

export default function DeleteTicketModal({ show, title, onClose, onDelete, }: Props) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete<strong>{" "}{title}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}