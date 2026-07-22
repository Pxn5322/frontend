import { PlatformUser } from "./platformUser";

export type PlatformUserAction =
    | {
        type: "SET_LOADING";
        payload: boolean;
    } | {
        type: "SET_USERS";
        payload: PlatformUser[];
    } | {
        type: "UPDATE_USER";
        payload: PlatformUser;
    } | {
        type: "DELETE_USER";
        payload: string;
    };