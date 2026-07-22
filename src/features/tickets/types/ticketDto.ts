export interface TicketDto {
    id: string;
    title: string;
    rawText: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "ANGRY";
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    tenantId: string;
    createdById: string;
    createdBy: { id: string; name: string; email: string; };
    attachmentUrl?: string;
    createdAt: string;
    updatedAt: string;
}