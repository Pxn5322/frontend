"use client";

import Form from "react-bootstrap/Form";
import { useTicketContext } from "@/contexts/TicketContext";
import { STATUS } from "@/constants/ticket";

export default function StatusFilter() {
    const {
        statusFilter,
        setStatusFilter,
    } = useTicketContext();

    return (
        <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            {STATUS.map(status => (
                <option key={status} value={status}>{status}</option>
            ))}
        </Form.Select>
    );
}