"use client";

import { Button } from "react-bootstrap";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const router = useRouter();
    const { platformUser } = useAuth();

    async function handleLogout() {
        await logout();
        router.push("/login");
    }

    return (
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
            <h4>Dashboard</h4>
            <div>
                <span className="me-3">{platformUser?.email}</span>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
}