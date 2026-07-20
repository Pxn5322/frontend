"use client";

import Form from "react-bootstrap/Form";
import { useTicketContext } from "@/features/tickets/context/TicketContext";
import { STATUS } from "@/constants/ticket";

export default function StatusFilter() {
    const {
        statusFilter,
        setStatusFilter,
    } = useTicketContext();

    return (
        <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">ALL STATUS</option>
            {STATUS.map(status => (
                <option key={status} value={status}>{status.split("_").join(" ")}</option>
            ))}
        </Form.Select>
    );
}