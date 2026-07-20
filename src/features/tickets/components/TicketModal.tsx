"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Modal, Form, Button, Spinner, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema, TicketSchemaForm } from "@/schemas/ticketSchema";
import { Ticket } from "../types/tickets";
import { PRIORITY, STATUS } from "@/constants/ticket";


interface Props {
    show: boolean;
    ticket: Ticket | null;
    onClose: () => void;
    onSave: (id: string, data: Partial<Ticket>, newFile?: File | null) => Promise<void>;
}

export default function TicketModal({ show, ticket, onClose, onSave, }: Props) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, }, } = useForm<TicketSchemaForm>({ resolver: zodResolver(ticketSchema), });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title,
                rawText: ticket.rawText,
                status: ticket.status,
                priority: ticket.priority
            });
        }
    }, [ticket, reset]);

    async function submit(data: TicketSchemaForm) {
        try {
            if (!ticket) return;

            await onSave(ticket.id, { ...data, attachmentUrl: ticket.attachmentUrl }, selectedFile);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            reset();
        }
    }

    const cleanUrl = ticket?.attachmentUrl
        ? decodeURIComponent(ticket.attachmentUrl).split("?")[0].toLowerCase()
        : "";

    const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(cleanUrl);

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
                    <Form.Group className="mt-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select  {...register("status")}>
                            {STATUS.filter(s => s !== "").map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select {...register("priority")}>
                            {PRIORITY.filter(p => p !== "").map(priority => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {ticket?.attachmentUrl &&
                        <>
                            <h6>Current Attachment</h6>
                            {isImage
                                ? <Image alt="ticket-attachment" src={ticket.attachmentUrl} fluid rounded thumbnail className="mb-3" style={{ maxHeight: 250, objectFit: "contain", }} />
                                : <Button as="a" href={ticket.attachmentUrl} target="_blank" variant="outline-secondary" className="mb-3">
                                    Open Attachment
                                </Button>
                            }
                        </>
                    }
                    <Form.Group className="mb-4">
                        <Form.Label>Replace Attachment</Form.Label>
                        <Form.Control type="file" accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSelectedFile(e.target.files?.[0] ?? null);
                            }}
                        />
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