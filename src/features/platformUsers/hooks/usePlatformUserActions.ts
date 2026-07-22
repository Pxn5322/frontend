"use client";

import toast from "react-hot-toast";
import { usePlatformUserContext } from "../context/PlatformUserProvider";
import { UpdatePlatformUserRequest } from "../types/updatePlatformUser";
import axios from "axios";

export default function usePlatformUserActions() {
    const {
        editUser,
        changePassword,
        removeUser,
    } = usePlatformUserContext();

    async function update(id: string, data: UpdatePlatformUserRequest) {
        try {
            await editUser(id, data);
            toast.success("User updated.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to update user.");
            }
        }
    }

    async function resetPassword(id: string, password: string) {
        try {
            await changePassword(id, password);
            toast.success("Password updated.");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to change password.");
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
        update,
        resetPassword,
        remove,
    };
}