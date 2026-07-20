"use client";

import Form from "react-bootstrap/Form";
import { useTicketContext } from "@/features/tickets/context/TicketContext";
import { PRIORITY } from "@/constants/ticket";

export default function PriorityFilter() {
    const {
        priorityFilter,
        setPriorityFilter,
    } = useTicketContext();

    return (
        <Form.Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">ALL PRIORITY</option>
            {PRIORITY.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
            ))}
        </Form.Select>
    );
}