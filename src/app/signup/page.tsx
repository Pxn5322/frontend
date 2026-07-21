"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupForm, } from "@/schemas/signupSchema";
import { registerUser, signup, deleteAccount } from "@/services/authService";
import toast from "react-hot-toast";
import { Button, Card, Container, Form, Spinner, } from "react-bootstrap";

export default function SignupPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting, }, } = useForm<SignupForm>({ resolver: zodResolver(signupSchema), });

    async function onSubmit(data: SignupForm) {
        let credential;

        try {
            credential = await signup(data.email, data.password);

            await registerUser({
                uid: credential.user.uid,
                name: data.name,
                email: data.email,
                companyCode: data.companyCode,
            });

            toast.success("Account created successfully.");
            router.push("/login");
        } catch (error: any) {
            if (credential) {
                await deleteAccount(credential.user);
            }
            toast.error(error.message);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="shadow p-4" style={{ width: 420 }}>
                <h2 className="text-center mb-4">Register</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control {...register("name")} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Code</Form.Label>
                        <Form.Control {...register("companyCode")} />
                    </Form.Group>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" {...register("confirmPassword")} />
                        <small className="text-danger">{errors.confirmPassword?.message}</small>
                    </Form.Group>
                    <Button type="submit" className="w-100" disabled={isSubmitting}>
                        {isSubmitting
                            ? <Spinner animation="border" size="sm" />
                            : "Create Account"
                        }
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}