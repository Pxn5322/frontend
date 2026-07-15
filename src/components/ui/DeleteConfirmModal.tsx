"use client";

import { Modal, Button } from "react-bootstrap";

interface Props {
    show: boolean;
    title: string;
    message?: string;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({ show, title, message, onClose, onConfirm, }: Props) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message ??
                    <>Are you sure you want to delete{" "}<strong>{title}</strong>?</>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={onConfirm}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}