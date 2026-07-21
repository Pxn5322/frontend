"use client";

import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import { PlatformUser } from "../types/user";

export default function useUsers() {
    const [users, setUsers] = useState<PlatformUser[]>([]);
    const [loading, setLoading] = useState(true);

    async function refresh() {
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return {
        users,
        loading,
        refresh,
    };
}