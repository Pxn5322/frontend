"use client";

import { Form, Button, Spinner, } from "react-bootstrap";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { knowledgeSchema, KnowledgeForm as KnowledgeFormType, } from "@/schemas/knowledgeSchema";

interface Props {
    onSubmit: (
        title: string,
        content: string
    ) => Promise<void>;
}

export default function KnowledgeForm({ onSubmit, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<KnowledgeFormType>({
        resolver: zodResolver(knowledgeSchema),
    });

    async function submit(data: KnowledgeFormType) {
        await onSubmit(data.title, data.content);
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
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={8} {...register("content")} />
                    <small className="text-danger">{errors.content?.message}</small>
                </Form.Group>
                <Button className="mt-3" type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? <Spinner animation="border" size="sm" />
                        : "Create"}
                </Button>
            </Form>
        </>
    );
}