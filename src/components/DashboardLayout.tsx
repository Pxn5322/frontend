"use client";

import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children, }: Props) {
    const router = useRouter();
    const { platformUser } = useAuth();

    async function handleLogout() {
        await logout();
        router.replace("/login");
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Enterprise Nexus</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                        <Link href="/tickets" className="nav-link">Tickets</Link>
                        {platformUser?.role === "ADMIN" && (
                            <Link href="/admin" className="nav-link">Admin</Link>
                        )}
                    </Nav>
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </Container>
            </Navbar>
            <Container className="mt-4">
                {children}
            </Container>
        </>
    );
}