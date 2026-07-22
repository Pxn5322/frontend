"use client";

import { useEffect } from "react";
import { Modal, Form, Button, Spinner, Row, Col, Card, } from "react-bootstrap";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { platformUserSchema, PlatformUserFormData, } from "@/schemas/platformUserSchema";
import { PlatformUser, } from "../types/platformUser";

interface Props {
    show: boolean;
    user: PlatformUser | null;
    onClose: () => void;
    onSave: (id: string, data: PlatformUserFormData) => Promise<void>;
    onChangePassword: (id: string, password: string) => Promise<void>;
}

export default function PlatformUserEditModal({ show, user, onClose, onSave, onChangePassword, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, },
    } = useForm<PlatformUserFormData>({
        resolver: zodResolver(platformUserSchema),
    });

    useEffect(() => {
        if (!user) return;

        reset({
            name: user.name,
            email: user.email,
            role: user.role as "ADMIN" | "AGENT" | "USER",
            password: "",
        });
    }, [user, reset,]);

    const password = watch("password");

    async function submit(data: PlatformUserFormData) {
        if (!user) return;

        await onSave(user.id, { name: data.name, email: data.email, role: data.role, });

        if (data.password && data.password.length > 0) {
            await onChangePassword(user.id, data.password);
        }

        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submit)}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control {...register("name")} />
                                <small className="text-danger">{errors.name?.message}</small>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control {...register("email")} />
                                <small className="text-danger">{errors.email?.message}</small>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select{...register("role")}>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="AGENT">AGENT</option>
                                    <option value="USER">USER</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Card className="mt-4">
                        <Card.Header>Change Password</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Leave blank to keep existing password" {...register("password")} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" className="me-2" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? <> <Spinner size="sm" className="me-2" /> Saving...</>
                                : "Save Profile"
                            }
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}