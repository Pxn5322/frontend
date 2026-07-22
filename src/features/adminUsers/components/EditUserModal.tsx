"use client";

import { Modal, Form, Button, Spinner, } from "react-bootstrap";
import { useForm, } from "react-hook-form";
import { useEffect, } from "react";
import { zodResolver, } from "@hookform/resolvers/zod";
import { editUserSchema, EditUserFormData, } from "@/schemas/userSchema";
import { AdminUser, } from "../types/adminUser";

interface Props {
    show: boolean;
    user: AdminUser | null;
    onClose: () => void;
    onSave: (id: string, data: Partial<AdminUser>) => Promise<void>;
}

export default function EditUserModal({ show, user, onClose, onSave, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<EditUserFormData>({
        resolver: zodResolver(editUserSchema),
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }
    }, [user, reset]);

    async function submit(data: EditUserFormData) {
        if (!user) return;
        await onSave(user.id, data,);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register("name")} />
                        <small className="text-danger">{errors.name?.message}</small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control {...register("email")} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Role</Form.Label>
                        <Form.Select {...register("role")}>
                            <option value="USER">USER</option>
                            <option value="AGENT">AGENT</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="secondary" className="me-2" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? <Spinner size="sm" animation="border" />
                                : "Save"
                            }
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}