"use client";

import { Container, Navbar, Nav, Button, } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, } from "lucide-react";
import RoleBadge from "./RoleBadge";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children, }: Props) {
    const pathname = usePathname();
    const {
        platformUser,
        isEnterprise,
        isAdmin,
        isAgent,
        isUser,
        logoutUser,
    } = useAuth();

    async function handleLogout() {
        await logoutUser();
    }

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    return (
        <>
            <Navbar expand="lg" className="glassNavbar py-2.5">
                <Container>
                    <Link href="/dashboard" className="brandLogoWrapper me-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            fill="none"
                            width="32"
                            height="32"
                            className="brandLogoSvg"
                        >
                            <rect width="22" height="22" rx="7" fill="#0F172A" />
                            <defs>
                                <linearGradient id="nexusGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="50%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#06B6D4" />
                                </linearGradient>
                            </defs>
                            <path d="M8 8V24M8 8H12L20 24H24V8M20 24V8" stroke="url(#nexusGradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="22" cy="10" r="1.75" fill="#22C55E" />
                        </svg>
                        <span>Enterprise Nexus</span>
                    </Link>
                    <Navbar.Toggle aria-controls="dashboard-navbar-nav" className="border-0 shadow-none" />
                    <Navbar.Collapse id="dashboard-navbar-nav">
                        <Nav className="me-auto gap-1 my-2 my-lg-0">
                            {(isAdmin || isAgent) && (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className={`nav-link navLinkCustom ${pathname === "/dashboard" ? "navLinkActive" : ""}`}
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        href="/tickets"
                                        className={`nav-link navLinkCustom ${isActive("/tickets") ? "navLinkActive" : ""}`}
                                    >
                                        Tickets
                                    </Link>
                                </>
                            )}
                            {isAdmin && (
                                <>
                                    <Link
                                        href="/admin/users"
                                        className={`nav-link navLinkCustom ${isActive("/admin/users") ? "navLinkActive" : ""}`}
                                    >
                                        Users
                                    </Link>

                                    <Link
                                        href="/admin/tenants"
                                        className={`nav-link navLinkCustom ${isActive("/admin/tenants") ? "navLinkActive" : ""}`}
                                    >
                                        Tenants
                                    </Link>

                                    <Link
                                        href="/knowledge"
                                        className={`nav-link navLinkCustom ${isActive("/knowledge") ? "navLinkActive" : ""}`}
                                    >
                                        Knowledge Base
                                    </Link>
                                </>
                            )}
                            {isEnterprise && (
                                <>
                                    <Link
                                        href="/enterprise/dashboard"
                                        className={`nav-link navLinkCustom ${isActive("/enterprise/dashboard") ? "navLinkActive" : ""}`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/enterprise/tenants"
                                        className={`nav-link navLinkCustom ${isActive("/enterprise/tenants") ? "navLinkActive" : ""}`}
                                    >
                                        Companies
                                    </Link>
                                    <Link
                                        href="/enterprise/users"
                                        className={`nav-link navLinkCustom ${isActive("/enterprise/users") ? "navLinkActive" : ""}`}
                                    >
                                        Users
                                    </Link>
                                </>
                            )}
                        </Nav>

                        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 pt-3 pt-lg-0">
                            {platformUser && (
                                <div className="userPill d-none d-md-flex">
                                    <User size={14} className="text-info" />
                                    <span className="fw-medium">{
                                        platformUser?.name.length > 5
                                            ? platformUser?.name.substring(0, 5) + "..."
                                            : platformUser?.name
                                    }</span>
                                    <RoleBadge role={platformUser.role} />
                                </div>
                            )}

                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleLogout}
                                className="d-flex align-items-center gap-1.5 px-3 py-1.5 fw-semibold rounded-3 w-100 w-lg-auto justify-content-center"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-4 my-2">
                {children}
            </Container>
        </>
    );
}