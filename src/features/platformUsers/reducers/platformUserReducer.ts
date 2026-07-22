import { PlatformUserAction } from "../types/platformUserAction";
import { PlatformUserState } from "../types/platformUserState";

export const initialPlatformUserState: PlatformUserState = {
    users: [],
    loading: false,
};

export function platformUserReducer(state: PlatformUserState, action: PlatformUserAction): PlatformUserState {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_USERS":
            return {
                ...state,
                users: action.payload,
            };
        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user),
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };
        default:
            return state;
    }
}