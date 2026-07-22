"use client";

import { Modal, Form, Button, Spinner, } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { changePasswordSchema, ChangePasswordFormData, } from "@/schemas/userSchema";

interface Props {
    show: boolean;
    userId: string;
    onClose: () => void;
    onSave: (id: string, password: string) => Promise<void>;
}

export default function ResetPasswordModal({ show, userId, onClose, onSave, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    async function submit(data: ChangePasswordFormData) {
        await onSave(userId, data.password);
        reset();
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" {...register("password")} />
                        <small className="text-danger">{errors.password?.message}</small>
                    </Form.Group>
                    <div className="mt-4 text-end">
                        <Button variant="secondary" className="me-2" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? <Spinner animation="border" size="sm" />
                                : "Reset Password"
                            }
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}