"use client";

import { Modal, Form, Button, Spinner, } from "react-bootstrap";
import { useEffect, } from "react";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { knowledgeSchema, KnowledgeForm as KnowledgeFormType, } from "@/schemas/knowledgeSchema";
import { Knowledge, } from "../types/knowledge";

interface Props {
    show: boolean;
    article: Knowledge | null;
    onClose: () => void;
    onSave: (id: string, title: string, content: string) => Promise<void>;
}

export default function KnowledgeModal({ show, article, onClose, onSave, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<KnowledgeFormType>({ resolver: zodResolver(knowledgeSchema), });

    useEffect(() => {
        if (article) {
            reset({ title: article.title, content: article.content, });
        }
    }, [article, reset]);

    async function submit(data: KnowledgeFormType) {
        if (!article) return;

        await onSave(article.id, data.title, data.content);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Article</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control {...register("title")} />
                        <small className="text-danger">{errors.title?.message}</small>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={10} {...register("content")} />
                        <small className="text-danger">{errors.content?.message}</small>
                    </Form.Group>
                    <div className="mt-4 d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={onClose}>Cancel</Button>
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