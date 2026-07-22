import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters.")
        .max(100, "Name is too long."),

    email: z
        .email("Invalid email address."),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters."),

    role: z.enum([
        "ADMIN",
        "AGENT",
        "USER",
    ]),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export const editUserSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters.")
        .max(100),

    email: z
        .email("Invalid email address."),

    role: z.enum([
        "ADMIN",
        "AGENT",
        "USER",
    ]),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;

export const changePasswordSchema = z.object({
    password: z
        .string()
        .min(6, "Password must be at least 6 characters."),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;