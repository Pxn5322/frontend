"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="bg-dark text-white p-3" style={{ width: 250, minHeight: "100vh" }}>
            <h3 className="mb-4">HelpDesk AI</h3>
            <div className="d-grid gap-2">
                <Link href="/dashboard" className="btn btn-dark">Dashboard</Link>
                <Link href="/tickets" className="btn btn-dark">Tickets</Link>
                <Link href="/knowledge" className="btn btn-dark">Knowledge Base</Link>
                <Link href="/settings" className="btn btn-dark">Settings</Link>
            </div>
        </div>
    );
}