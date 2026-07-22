export interface Ticket {
    id: string;
    title: string;
    rawText: string;
    attachmentUrl?: string;
    status: | "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    priority: | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    sentiment: | "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "ANGRY";
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}