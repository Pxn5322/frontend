"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const { firebaseUser, platformUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !firebaseUser) {
            router.replace("/login");
        }
    }, [firebaseUser, loading, router]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>Loading...</div>
        );
    }

    if (!firebaseUser || !platformUser) {
        return null;
    }

    return children;
}