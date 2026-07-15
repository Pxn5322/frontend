import { z } from "zod";

export const knowledgeSchema = z.object({
    title: z
        .string()
        .min(5)
        .max(100),

    content: z
        .string()
        .min(20)
        .max(10000),
});

export type KnowledgeForm = z.infer<typeof knowledgeSchema>;