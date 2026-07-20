"use client";

import { Button, Form, Spinner, } from "react-bootstrap";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { ticketSchema, TicketSchemaForm, } from "@/schemas/ticketSchema";
import { useState } from "react";
import { uploadTicketAttachment } from "../services/storageService";

interface Props {
    onSubmit: (
        title: string,
        rawText: string,
        attachmentUrl?: string,
    ) => Promise<void>;
}

export default function TicketForm({ onSubmit, }: Props) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<TicketSchemaForm>({
        resolver: zodResolver(ticketSchema),
    });

    async function submit(data: TicketSchemaForm) {
        try {
            setUploading(true);
            let attachmentUrl: string | undefined;

            if (selectedFile) {
                attachmentUrl = await uploadTicketAttachment(selectedFile);
            }

            await onSubmit(data.title, data.rawText, attachmentUrl);
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
            reset();
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control {...register("title")} />
                    <small className="text-danger">{errors.title?.message}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} {...register("rawText")} />
                    <small className="text-danger">{errors.rawText?.message}</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0] ?? null;
                            setSelectedFile(file);
                        }} />
                </Form.Group>
                <Button type="submit" disabled={isSubmitting || uploading}>
                    {isSubmitting || uploading
                        ? <Spinner animation="border" size="sm" />
                        : "Create Ticket"
                    }
                </Button>
            </Form>
        </>
    );
}