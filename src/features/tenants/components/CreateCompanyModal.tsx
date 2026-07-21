"use client";

import { Modal, } from "react-bootstrap";
import CompanyForm from "./CompanyForm";
import { CompanyRegistration } from "../services/companyService";

interface Props {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: CompanyRegistration) => Promise<void>;
}

export default function CreateCompanyModal({ show, onClose, onSubmit, }: Props) {
    async function handleCreate(companyName: string, companyCode: string, adminName: string, adminEmail: string, adminPassword: string) {
        await onSubmit({ companyName, companyCode, adminName, adminEmail, adminPassword });
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CompanyForm onSubmit={handleCreate} />
            </Modal.Body>
        </Modal>
    );
}