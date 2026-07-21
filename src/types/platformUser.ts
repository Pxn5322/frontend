export interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: "ENTERPRISE" | "ADMIN" | "AGENT" | "USER";
    tenantId: string;
    createdAt: string;
}