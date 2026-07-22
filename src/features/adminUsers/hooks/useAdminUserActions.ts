"use client";

import toast from "react-hot-toast";
import { useAdminUserContext } from "../context/AdminUserProvider";
import { CreateUserRequest, } from "../services/adminUserService";
import { AdminUser } from "../types/adminUser";
import axios from "axios";

export default function useAdminUserActions() {
    const {
        addUser,
        editUser,
        removeUser,
        resetPassword,
    } = useAdminUserContext();

    async function create(data: CreateUserRequest) {
        try {
            await addUser(data);
            toast.success("User created.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to create user.");
            }
        }
    }

    async function update(id: string, data: Partial<AdminUser>) {
        try {
            await editUser(id, data,);
            toast.success("User updated.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to update user.");
            }
        }
    }

    async function password(id: string, newPassword: string) {
        try {
            await resetPassword(id, newPassword,);
            toast.success("Password updated.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to update password.");
            }
        }
    }

    async function remove(id: string) {
        try {
            await removeUser(id);
            toast.success("User deleted.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to delete user.");
            }
        }
    }

    return {
        create,
        update,
        password,
        remove,
    };
}