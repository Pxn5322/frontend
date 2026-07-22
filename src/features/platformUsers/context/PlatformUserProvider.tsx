"use client";

import { createContext, useContext, useEffect, useReducer, } from "react";
import * as platformUserService from "../services/platformUserService";
import { initialPlatformUserState, platformUserReducer } from "../reducers/platformUserReducer";
import { PlatformUser } from "../types/platformUser";
import { useAuth } from "@/contexts/AuthContext";
import { UpdatePlatformUserRequest } from "../types/updatePlatformUser";

interface PlatformUserContextType {
    users: PlatformUser[];
    loading: boolean;
    loadUsers: () => Promise<void>;
    editUser: (id: string, data: { name: string; email: string; role: string; }) => Promise<void>;
    changePassword: (id: string, password: string) => Promise<void>;
    removeUser: (id: string) => Promise<void>;
}

const PlatformUserContext = createContext<PlatformUserContextType | null>(null);

export function PlatformUserProvider({ children, }: React.PropsWithChildren) {
    const [state, dispatch] = useReducer(platformUserReducer, initialPlatformUserState);
    const { loading, isEnterprise } = useAuth();

    async function loadUsers() {
        try {
            dispatch({ type: "SET_LOADING", payload: true, });
            const data = await platformUserService.getPlatformUsers();
            dispatch({ type: "SET_USERS", payload: data, });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            dispatch({ type: "SET_LOADING", payload: false, });
        }
    }

    useEffect(() => {
        if (!loading && isEnterprise) {
            loadUsers();
        } else {
            dispatch({ type: "SET_USERS", payload: [] });
        }
    }, [loading, isEnterprise]);

    async function editUser(id: string, data: UpdatePlatformUserRequest) {
        const updated = await platformUserService.updatePlatformUser(id, data);
        dispatch({ type: "UPDATE_USER", payload: updated, });
    }

    async function changePassword(id: string, password: string) {
        const updated = await platformUserService.changePassword(id, password);
        dispatch({ type: "UPDATE_USER", payload: updated, });
    }

    async function removeUser(id: string) {
        await platformUserService.deletePlatformUser(id);
        dispatch({ type: "DELETE_USER", payload: id, });
    }

    return (
        <PlatformUserContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                loadUsers,
                editUser,
                changePassword,
                removeUser,
            }}>
            {children}
        </PlatformUserContext.Provider>
    );
}

export function usePlatformUserContext() {
    const context = useContext(PlatformUserContext);

    if (!context) {
        throw new Error("PlatformUserProvider missing");
    }

    return context;
}