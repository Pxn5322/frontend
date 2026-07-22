import { PlatformUser } from "./platformUser";

export interface PlatformUserState {
    users: PlatformUser[];
    loading: boolean;
}