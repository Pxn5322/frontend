import { z } from "zod";

export const companySchema = z.object({
    companyName: z
        .string()
        .min(2, "Company name is required"),

    companyCode: z
        .string()
        .min(3)
        .max(10)
        .regex(
            /^[A-Z0-9]+$/,
            "Only uppercase letters and numbers"
        ),

    adminName: z
        .string()
        .min(2),

    adminEmail: z
        .email(),

    adminPassword: z
        .string()
        .min(6),
});

export type CompanyFormData = z.infer<typeof companySchema>;

export const companyEditSchema = z.object({
    companyName: z
        .string()
        .min(2, "Company name is required"),

    companyCode: z
        .string()
        .min(3)
        .max(10)
        .regex(
            /^[A-Z0-9]+$/,
            "Only uppercase letters and numbers"
        ),
});

export type CompanyEditFormData = z.infer<typeof companyEditSchema>;