"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Navbar />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}