"use client";

import { usePlatformUserContext } from "../context/PlatformUserProvider";

export default function usePlatformUsers() {
    const {
        users,
        loading,
        loadUsers,
    } = usePlatformUserContext();

    return {
        users,
        loading,
        refresh: loadUsers,
    };
}