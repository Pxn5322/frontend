"use client";

import Form from "react-bootstrap/Form";
import { useTicketContext } from "@/contexts/TicketContext";

export default function SortDropdown() {
    const {
        sort,
        setSort,
    } = useTicketContext();

    return (
        <Form.Select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest")}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
        </Form.Select>
    );
}