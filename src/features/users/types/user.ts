export interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "AGENT" | "USER";
    tenantId: string;
    createAt: string;
}

export interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "AGENT" | "USER";
    createdAt: string;
}