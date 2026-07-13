"use client";

import { useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema, TicketSchemaForm } from "@/schemas/ticketSchema";
import { Ticket } from "../types/tickets";


interface Props {
    show: boolean;
    ticket: Ticket | null;
    onClose: () => void;
    onSave: (id: string, title: string, rawText: string) => Promise<void>;
}

export default function TicketModal({ show, ticket, onClose, onSave, }: Props) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, }, } = useForm<TicketSchemaForm>({ resolver: zodResolver(ticketSchema), });

    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title,
                rawText: ticket.rawText,
            });
        }
    }, [ticket, reset]);

    async function submit(data: TicketSchemaForm) {
        if (!ticket) return;

        await onSave(ticket.id, data.title, data.rawText);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control {...register("title")} />
                        <small className="text-danger">{errors.title?.message}</small>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} {...register("rawText")} />
                        <small className="text-danger">{errors.rawText?.message}</small>
                    </Form.Group>
                    <div className="mt-4 d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? <Spinner animation="border" size="sm" />
                                : "Save"
                            }
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}