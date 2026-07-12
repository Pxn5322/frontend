export interface PlatformUser {
    id: string;
    email: string;
    role: "ADMIN" | "AGENT";
    tenantId: string;
    createdAt: string;
}