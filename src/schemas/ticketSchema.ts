import { z } from "zod";

export const ticketSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(100),

    rawText: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(5000),

    status: z.enum([
        "OPEN",
        "IN_PROGRESS",
        "RESOLVED",
        "CLOSED",
    ]).optional(),

    priority: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
    ]).optional()
});

export type TicketSchemaForm = z.infer<typeof ticketSchema>;