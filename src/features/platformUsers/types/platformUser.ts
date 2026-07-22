export interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    tenant: {
        id: string;
        companyName: string;
        companyCode: string;
    };
}