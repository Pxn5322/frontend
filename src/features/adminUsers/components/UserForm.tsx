"use client";

import { Button, Form, Spinner, } from "react-bootstrap";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { createUserSchema, CreateUserFormData, } from "@/schemas/userSchema";

interface Props {
    onSubmit: (
        name: string,
        email: string,
        password: string,
        role: "ADMIN" | "AGENT" | "USER"
    ) => Promise<void>;
}

export default function UserForm({ onSubmit, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
    });

    async function submit(data: CreateUserFormData) {
        try {
            await onSubmit(data.name, data.email, data.password, data.role,);
        } finally {
            reset();
        }
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control {...register("name")} />
                <small className="text-danger">{errors.name?.message}</small>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email")} />
                <small className="text-danger">{errors.email?.message}</small>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register("password")} />
                <small className="text-danger">{errors.password?.message}</small>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Role</Form.Label>
                <Form.Select {...register("role")}>
                    <option value="USER">USER</option>
                    <option value="AGENT">AGENT</option>
                    <option value="ADMIN">ADMIN</option>
                </Form.Select>
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                    ? <Spinner size="sm" animation="border" />
                    : "Create User"
                }
            </Button>
        </Form>
    );
}