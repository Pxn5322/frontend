export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "AGENT" | "USER";
    tenantId: string;
    createdAt: string;
}