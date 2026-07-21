"use client";

import { Form, Button, Spinner, } from "react-bootstrap";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { companySchema, CompanyFormData, } from "@/schemas/companySchema";

interface Props {
    onSubmit: (
        companyName: string,
        companyCode: string,
        adminName: string,
        adminEmail: string,
        adminPassword: string,
    ) => Promise<void>;
}

export default function CompanyForm({ onSubmit, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
    });

    async function submit(data: CompanyFormData) {
        try {
            await onSubmit(data.companyName, data.companyCode, data.adminName, data.adminEmail, data.adminPassword);
        } catch (error) {
            console.error(error);
        } finally {
            reset();
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control {...register("companyName")} />
                    <small className="text-danger">{errors.companyName?.message}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Company Code</Form.Label>
                    <Form.Control {...register("companyCode")} />
                    <small className="text-danger">{errors.companyCode?.message}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Admin Name</Form.Label>
                    <Form.Control {...register("adminName")} />
                    <small className="text-danger">{errors.adminName?.message}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Admin Email</Form.Label>
                    <Form.Control {...register("adminEmail")} />
                    <small className="text-danger">{errors.adminEmail?.message}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("adminPassword")} />
                    <small className="text-danger">{errors.adminPassword?.message}</small>
                </Form.Group>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? <Spinner animation="border" size="sm" />
                        : "Create Company"
                    }
                </Button>
            </Form>
        </>
    );
}