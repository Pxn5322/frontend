"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { DashboardData } from "../types/dashboard";
import DashboardCard from "./DashboardCard";
import { BookOpen, CircleCheckBig, Clock3, FolderOpen, ShieldAlert, Ticket, TriangleAlert } from "lucide-react";

interface Props {
    dashboard: DashboardData;
}

export default function DashboardGrid({ dashboard, }: Props) {
    return (
        <Row className="g-3">
            <Col md={3}>
                <DashboardCard title="Total Tickets" value={dashboard.totalTickets} icon={Ticket} color="#0d6efd" />
            </Col>
            <Col md={3}>
                <DashboardCard title="Open" value={dashboard.openTickets} icon={FolderOpen} color="#ffc107" />
            </Col>
            <Col md={3}>
                <DashboardCard title="In Progress" value={dashboard.progressTickets} icon={Clock3} color="#0dcaf0" />
            </Col>
            <Col md={3}>
                <DashboardCard title="Resolved" value={dashboard.resolvedTickets} icon={CircleCheckBig} color="#198754" />
            </Col>
            <Col md={4}>
                <DashboardCard title="High Priority" value={dashboard.highPriorityTickets} icon={TriangleAlert} color="#fd7e14" />
            </Col>
            <Col md={4}>
                <DashboardCard title="Critical" value={dashboard.criticalPriorityTickets} icon={ShieldAlert} color="#dc3545" />
            </Col>
            <Col md={4}>
                <DashboardCard title="Knowledge Base" value={dashboard.knowledgeCount} icon={BookOpen} color="#6f42c1" />
            </Col>
        </Row>
    );
}