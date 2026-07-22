import StatusBadge from "@/features/tickets/components/StatusBadge";
import styles from "../../../app/dashboard/dashboard.module.css";
import { Ticket } from "@/features/tickets/types/tickets";
import TicketDetailModal from "@/features/tickets/components/TicketDetailModal";
import { useState } from "react";

interface Props {
    ticket: Ticket;
}

export default function RecentTicketItem({ ticket }: Props) {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <p className={styles.ticketLink} onClick={() => setShowDetail(true)}>{ticket.title}</p>
                <StatusBadge status={ticket.status} />
            </div>

            <TicketDetailModal show={showDetail} ticket={ticket} onClose={() => setShowDetail(false)} />
        </>
    );
}