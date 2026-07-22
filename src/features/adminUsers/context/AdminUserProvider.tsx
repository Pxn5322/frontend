"use client";

import { createContext, useContext, useEffect, useReducer, } from "react";
import * as adminUserService from "../services/adminUserService";
import { useAuth } from "@/contexts/AuthContext";
import { AdminUser } from "../types/adminUser";
import { adminUserReducer, initialAdminUserState, } from "../reducers/adminUserReducer";

interface AdminUserContextType {
    users: AdminUser[];
    loading: boolean;
    loadUsers: () => Promise<void>;
    addUser: (data: adminUserService.CreateUserRequest) => Promise<void>;
    editUser: (id: string, data: Partial<AdminUser>) => Promise<void>;
    resetPassword: (id: string, password: string) => Promise<void>;
    removeUser: (id: string) => Promise<void>;
}

const AdminUserContext = createContext<AdminUserContextType | null>(null);

export function AdminUserProvider({ children, }: React.PropsWithChildren) {
    const [state, dispatch] = useReducer(adminUserReducer, initialAdminUserState);

    const {
        platformUser,
        loading,
    } = useAuth();

    async function loadUsers() {
        try {
            dispatch({ type: "SET_LOADING", payload: true, });
            const users = await adminUserService.getUsers();
            dispatch({ type: "SET_USERS", payload: users, });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            dispatch({ type: "SET_LOADING", payload: false, });
        }
    }

    useEffect(() => {
        if (!loading && platformUser) {
            loadUsers();
        }
        else {
            dispatch({ type: "SET_USERS", payload: [], });
        }
    }, [loading, platformUser,]);

    async function addUser(data: adminUserService.CreateUserRequest) {
        const user = await adminUserService.createUser(data);
        dispatch({ type: "ADD_USER", payload: user, });
    }

    async function editUser(id: string, data: Partial<AdminUser>) {
        const updated = await adminUserService.updateUser(id, data,);
        dispatch({ type: "UPDATE_USER", payload: updated, });
    }

    async function resetPassword(id: string, password: string) {
        await adminUserService.changePassword(id, password,);
    }

    async function removeUser(id: string) {
        await adminUserService.deleteUser(id);
        dispatch({ type: "DELETE_USER", payload: id, });
    }

    return (
        <AdminUserContext.Provider value={{
            users: state.users,
            loading: state.loading,
            loadUsers,
            addUser,
            editUser,
            resetPassword,
            removeUser,
        }}>
            {children}
        </AdminUserContext.Provider>
    );
}

export function useAdminUserContext() {
    const context = useContext(AdminUserContext);

    if (!context) {
        throw new Error("AdminUserProvider missing.");
    }

    return context;
}