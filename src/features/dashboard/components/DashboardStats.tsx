"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StatCard from "./StatCard";
import useDashboardStats from "../hooks/useDashboardStats";

export default function DashboardStats() {
    const stats = useDashboardStats();

    return (
        <Row className="g-3">
            <Col md={3}>
                <StatCard title="Total Tickets" value={stats.total} />
            </Col>
            <Col md={3}>
                <StatCard title="Open" value={stats.open} />
            </Col>
            <Col md={3}>
                <StatCard title="Resolved" value={stats.resolved} />
            </Col>
            <Col md={3}>
                <StatCard title="High Priority" value={stats.highPriority} />
            </Col>
        </Row>
    );
}