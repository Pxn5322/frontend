"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function EnterpriseGuard({ children, }: { children: React.ReactNode; }) {
    const router = useRouter();
    const { platformUser, loading, isEnterprise } = useAuth();

    useEffect(() => {
        if (loading) return;

        if (!platformUser) {
            router.replace("/login");
            return;
        }

        if (!isEnterprise) {
            router.replace("/dashboard");
        }
    }, [platformUser, loading, router, isEnterprise]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <LoadingSpinner />
            </div>
        );
    }

    if (!platformUser) {
        return null;
    }

    if (!isEnterprise) {
        return null;
    }

    return children;
}