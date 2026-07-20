export interface Tenant {
    id: string;
    companyName: string;
    createdAt: string;
    _count: { users: number; tickets: number; };
}