"use client";

import { Modal, Button } from "react-bootstrap";
import { Tenant } from "../types/tenant";

interface Props {
    show: boolean;
    tenant: Tenant | null;
    onClose: () => void;
    onDelete: () => Promise<void>;
}

export default function DeleteTenantModal({ show, tenant, onClose, onDelete, }: Props) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Tenant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete<strong>{" "}{tenant?.companyName}{" "}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}