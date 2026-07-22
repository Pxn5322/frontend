"use client";

import { useAdminUserContext } from "../context/AdminUserProvider";

export default function useAdminUsers() {
    const {
        users,
        loading,
        loadUsers,
    } = useAdminUserContext();

    return {
        users,
        loading,
        refresh: loadUsers,
    };
}