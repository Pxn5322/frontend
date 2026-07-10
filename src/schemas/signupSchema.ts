import { z } from "zod";

export const signupSchema = z.object({
    email: z
        .string()
        .email("Invalid Email"),

    password: z
        .string()
        .min(6, "Minimum 6 characters"),

    confirmPassword: z
        .string()
}).refine(
    data => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
);

export type SignupForm = z.infer<typeof signupSchema>;