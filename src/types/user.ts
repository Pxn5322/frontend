export interface User {
    id: string;
    email: string;
    role: "ADMIN" | "AGENT";
    tenantId: string;
    createAt: string;
}