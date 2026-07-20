"use client";

import Form from "react-bootstrap/Form";
import { useTicketContext } from "@/features/tickets/context/TicketContext";

export default function SortDropdown() {
    const {
        sort,
        setSort,
    } = useTicketContext();

    return (
        <Form.Select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest")}>
            <option value="newest">NEWEST FIRST</option>
            <option value="oldest">OLDEST FIRST</option>
        </Form.Select>
    );
}