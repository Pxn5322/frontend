export interface Ticket {
    id: string;
    title: string;
    rawText: string;
    status: | "OPEN" | "IN_PROGRESS" | "RESOLVED";
    priority: | "PENDING" | "LOW" | "MEDIUM" | "HIGH";
    sentiment: | "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "ANGRY";
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}