"use client";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Link from "next/link";
import { Ticket } from "@/features/tickets/types/tickets";
import StatusBadge from "@/features/tickets/components/StatusBadge";
import styles from "../../../app/dashboard/dashboard.module.css";

interface Props {
    tickets: Ticket[];
}

export default function RecentTickets({ tickets = [] }: Props) {
    return (
        <Card className={`${styles.glassCard} mt-4 shadow-sm border-0 overflow-hidden`}>
            <Card.Header className="bg-transparent border-bottom border-secondary-subtle fw-bold py-3">
                Recent Pipeline Activity
            </Card.Header>
            <ListGroup variant="flush">
                {tickets.length === 0
                    ? (<ListGroup.Item className={`${styles.listItem} text-center py-4 text-muted`}>
                        No recent tickets found inside this tenant quadrant.
                    </ListGroup.Item>
                    )
                    : (tickets.map(ticket => (
                        <ListGroup.Item key={ticket.id} className={styles.listItem}>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link href={`/tickets/${ticket.id}`} className={styles.ticketLink}>
                                    {ticket.title}
                                </Link>
                                <StatusBadge status={ticket.status} />
                            </div>
                        </ListGroup.Item>
                    )))}
            </ListGroup>
        </Card>
    );
}