"use client";

import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Tenant } from "../types/tenant";

interface Props {
    show: boolean;
    tenant: Tenant | null;
    onClose: () => void;
    onSave: (companyName: string) => Promise<void>;
}

interface FormData {
    companyName: string;
}

export default function TenantModal({ show, tenant, onClose, onSave, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormData>();

    useEffect(() => {
        reset({ companyName: tenant?.companyName ?? "", });
    }, [tenant, reset]);

    async function submit(data: FormData) {
        await onSave(data.companyName);
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{tenant ? "Edit Tenant" : "Create Tenant"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(submit)}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control {...register("companyName", { required: true, })} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}