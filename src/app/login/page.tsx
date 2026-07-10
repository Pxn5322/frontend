"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/schemas/loginSchema";
import { login } from "@/services/authService";
import toast from "react-hot-toast";
import { Button, Card, Container, Form, Spinner, } from "react-bootstrap";

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting, }, } = useForm<LoginForm>({ resolver: zodResolver(loginSchema), });

    async function onSubmit(data: LoginForm) {
        try {
            await login(data.email, data.password);
            toast.success("Login Successful");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: 420 }} className="shadow p-4">
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" {...register("email")} />
                        <small className="text-danger">{errors.email?.message}</small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" {...register("password")} />
                        <small className="text-danger">{errors.password?.message}</small>
                    </Form.Group>
                    <Button type="submit" className="w-100" disabled={isSubmitting}>
                        {isSubmitting
                            ? <Spinner animation="border" size="sm" />
                            : "Login"
                        }
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}