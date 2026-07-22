export interface Ticket {
    id: string;
    title: string;
    rawText: string;
    attachmentUrl?: string;
    status: | "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    priority: | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    sentiment: | "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "ANGRY";
    tenantId: string;
    createdById: string;
    createdBy: { id: string; name: string; email: string; };
    createdAt: string;
    updatedAt: string;
}