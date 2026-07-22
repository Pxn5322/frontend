"use client";

import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import styles from "../../../app/dashboard/dashboard.module.css";

export default function QuickActions() {
    const { isAdmin } = useAuth();

    return (
        <Card className={`${styles.glassCard} shadow-sm mt-4 border-0`}>
            <Card.Header className="bg-transparent border-bottom border-secondary-subtle fw-bold py-3">
                Command Quick Actions
            </Card.Header>
            <Card.Body className="p-4">
                <div className="d-flex gap-3">
                    <Link href="/tickets" className={`btn ${styles.actionBtnPrimary} shadow-sm`}>
                        View Pipeline Tickets
                    </Link>
                    {isAdmin && (
                        <Link href="/knowledge" className={`btn ${styles.actionBtnSuccess} shadow-sm`}>
                            Manage Knowledge Base
                        </Link>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}