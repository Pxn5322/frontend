import { AdminUser } from "./adminUser";

export type AdminUserAction =
    | {
        type: "SET_LOADING";
        payload: boolean;
    } | {
        type: "SET_USERS";
        payload: AdminUser[];
    } | {
        type: "ADD_USER";
        payload: AdminUser;
    } | {
        type: "UPDATE_USER";
        payload: AdminUser;
    } | {
        type: "DELETE_USER";
        payload: string;
    };