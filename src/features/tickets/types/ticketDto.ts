export interface TicketDto {
    id: string;
    title: string;
    rawText: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "ANGRY";
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    tenantId: string;
    attachmentUrl?: string;
    createdAt: string;
    updatedAt: string;
}