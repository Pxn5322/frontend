"use client";

import { Modal, } from "react-bootstrap";
import UserForm from "./UserForm";
import { CreateUserRequest, } from "../services/adminUserService";

interface Props {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: CreateUserRequest) => Promise<void>;
}

export default function CreateUserModal({ show, onClose, onSubmit, }: Props) {

    async function handleCreate(name: string, email: string, password: string, role: "ADMIN" | "AGENT" | "USER") {
        await onSubmit({ name, email, password, role, });
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm onSubmit={handleCreate} />
            </Modal.Body>
        </Modal>
    );
}