"use client";

import { Button, Form, Spinner, } from "react-bootstrap";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { ticketSchema, TicketSchemaForm, } from "@/schemas/ticketSchema";

interface Props {
    onSubmit: (
        title: string,
        rawText: string
    ) => Promise<void>;
}

export default function TicketForm({ onSubmit, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<TicketSchemaForm>({
        resolver: zodResolver(ticketSchema),
    });

    async function submit(data: TicketSchemaForm) {
        await onSubmit(data.title, data.rawText);
        reset();
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
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? <Spinner animation="border" size="sm" />
                        : "Create Ticket"
                    }
                </Button>
            </Form>
        </>
    );
}