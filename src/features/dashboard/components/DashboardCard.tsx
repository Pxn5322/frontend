"use client";

import { LucideIcon } from "lucide-react";
import Card from "react-bootstrap/Card";
import styles from "../../../app/dashboard/dashboard.module.css";

interface Props {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
}

export default function DashboardCard({ title, value, icon: Icon, color, }: Props) {
    return (
        <Card className={`${styles.glassCard} h-100 shadow-sm`}>
            <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                    <span className="text-muted small text-uppercase fw-semibold tracking-wider">{title}</span>
                    <h1 className="mt-2 mb-0 fw-bold">{value}</h1>
                </div>
                <div className={styles.iconContainer} style={{ background: `${color}15` }}>
                    <Icon size={28} color={color} />
                </div>
            </Card.Body>
        </Card>
    );

}