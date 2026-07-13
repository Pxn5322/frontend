"use client";

import Form from "react-bootstrap/Form";
import { useTicketContext } from "@/contexts/TicketContext";

export default function SearchBar() {
    const {
        search,
        setSearch,
    } = useTicketContext();

    return (
        <Form.Control
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}