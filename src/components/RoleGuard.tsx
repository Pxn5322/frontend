"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
    children: React.ReactNode;
    allowedRoles: ("ADMIN" | "AGENT")[];
}

export default function RoleGuard({ children, allowedRoles, }: Props) {
    const { loading, platformUser, } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!platformUser) {
            router.replace("/login");
            return;
        }

        if (!allowedRoles.includes(platformUser.role)) {
            router.replace("/dashboard");
        }
    }, [loading, platformUser, allowedRoles, router]);

    if (loading) {
        return (
            <div className="text-center mt-5">Loading...</div>
        );
    }

    if (!platformUser) {
        return null;
    }

    if (!allowedRoles.includes(platformUser.role)) {
        return null;
    }

    return children;
}