import { AdminUser } from "./adminUser";

export interface AdminUserState {
    users: AdminUser[];
    loading: boolean;
}