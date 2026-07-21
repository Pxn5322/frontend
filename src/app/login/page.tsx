"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/schemas/loginSchema";
import { login } from "@/services/authService";
import toast from "react-hot-toast";
import { Button, Card, Container, Form, Spinner, } from "react-bootstrap";
import styles from "./login.module.css";
import { Roles } from "@/constants/roles";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
    const { platformUser, loading } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting, }, } = useForm<LoginForm>({ resolver: zodResolver(loginSchema), });

    async function onSubmit(data: LoginForm) {
        try {
            await login(data.email, data.password);
            toast.success("Login Successful");
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (loading) return;
        if (!platformUser) return;

        switch (platformUser.role) {
            case Roles.ENTERPRISE:
                router.replace("/enterprise/dashboard");
                break;
            case Roles.ADMIN:
                router.replace("/dashboard");
                break;
            case Roles.AGENT:
                router.replace("/dashboard");
                break;
            case Roles.USER:
                router.replace("/tickets");
                break;
        }
    }, [loading, platformUser, router]);

    return (
        <Container fluid className={styles.gatewayContainer}>
            <Card className={`${isSubmitting ? styles.glassCardProcessing : styles.glassCard} shadow-lg p-5 rounded-4 text-white`}>
                <div className="text-center mb-5">
                    <div className={styles.logoWrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" width="48" height="48">
                            <rect width="32" height="32" rx="7" fill="#0F172A" />
                            <defs>
                                <linearGradient id="nexusGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="50%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#06B6D4" />
                                </linearGradient>
                            </defs>
                            <path d="M8 8V24M8 8H12L20 24H24V8M20 24V8" stroke="url(#nexusGradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="22" cy="10" r="1.75" fill="#22C55E" />
                        </svg>
                    </div>
                    <h1 className="h3 fw-bolder mb-1 text-light">Enterprise Nexus</h1>
                    <p className="text-muted small">AI-Native Multi-Tenant Platform</p>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-medium text-secondary-emphasis">Work Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            {...register("email")}
                            placeholder="you@nexus.com"
                            className={`${styles.customInput} ${errors.email ? styles.inputError : ""}`}
                        />
                        {errors.email && <small className="text-danger d-block mt-1">{errors.email?.message}</small>}
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Label className="small fw-medium text-secondary-emphasis">Security Password</Form.Label>
                        <Form.Control
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                            className={`${styles.customInput} ${errors.password ? styles.inputError : ""}`}
                        />
                        {errors.password && <small className="text-danger d-block mt-1">{errors.password?.message}</small>}
                    </Form.Group>
                    <Button
                        type="submit"
                        className={`${styles.submitButton} w-100 fw-bold rounded-3`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : "Unlock Nexus Gateway"}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}