import { z } from "zod";

export const platformUserSchema = z.object({
    name: z
        .string()
        .min(2),

    email: z
        .string()
        .email(),

    role: z.enum([
        "ADMIN",
        "AGENT",
        "USER"
    ]),

    password: z
        .string()
        .optional(),
});

export type PlatformUserFormData = z.infer<typeof platformUserSchema>;