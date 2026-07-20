"use client";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import styles from "../../../app/dashboard/dashboard.module.css";

export default function QuickActions() {
    const { platformUser } = useAuth();

    return (
        <Card className={`${styles.glassCard} shadow-sm mt-4 border-0`}>
            <Card.Header className="bg-transparent border-bottom border-secondary-subtle fw-bold py-3">
                Command Quick Actions
            </Card.Header>
            <Card.Body className="p-4">
                <div className="d-flex gap-3">
                    <Button as={Link} href="/tickets" className={`${styles.actionBtnPrimary} shadow-sm`}>
                        View Pipeline Tickets
                    </Button>
                    {platformUser?.role === "ADMIN" && (
                        <Button as={Link} href="/knowledge" className={`${styles.actionBtnSuccess} shadow-sm`}>
                            Manage Knowledge Base
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}