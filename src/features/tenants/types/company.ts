export interface Company {
    id: string;
    companyName: string;
    companyCode: string;
    createdAt: string;
    _count: { users: number; tickets: number; };
}