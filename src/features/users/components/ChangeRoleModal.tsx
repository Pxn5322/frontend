"use client";

import { Modal, Button } from "react-bootstrap";

interface Props {
    show: boolean;
    message?: string;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function ChangeRoleModal({ show, message, onClose, onConfirm, }: Props) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Change Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message ??
                    <>Are you sure you want to change current user{" "}<strong>role</strong>?</>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={onConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}