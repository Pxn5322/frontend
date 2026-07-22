import { AdminUserAction } from "../types/adminUserAction";
import { AdminUserState } from "../types/adminUserState";

export const initialAdminUserState: AdminUserState = {
    users: [],
    loading: false,
};

export function adminUserReducer(state: AdminUserState, action: AdminUserAction): AdminUserState {
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
        case "ADD_USER":
            return {
                ...state,
                users: [action.payload, ...state.users,],
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