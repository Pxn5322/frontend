"use client";

import DashboardCard from "@/features/dashboard/components/DashboardCard";
import { Row, Col, } from "react-bootstrap";
import { BookOpen, Building2, Ticket, Users, } from "lucide-react";
import { EnterpriseDashboard } from "../services/enterpriseService";

interface Props {
    stats: EnterpriseDashboard;
}

export default function EnterpriseDashboardGrid({ stats }: Props) {
    return (
        <Row className="g-3">
            <Col md={3}>
                <DashboardCard title="Companies" value={stats?.companies ?? 0} icon={Building2} color="#29fd0d" />
            </Col>
            <Col md={3}>
                <DashboardCard title="Users" value={stats?.users ?? 0} icon={Users} color="#0eaae3" />
            </Col>
            <Col md={3}>
                <DashboardCard title="Tickets" value={stats?.tickets ?? 0} icon={Ticket} color="#0d6efd" />
            </Col>
            <Col md={3}>
                <DashboardCard title="Knowledges" value={stats?.knowledge ?? 0} icon={BookOpen} color="#6f42c1" />
            </Col>
        </Row>
    );
}