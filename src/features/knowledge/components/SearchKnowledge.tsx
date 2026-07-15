"use client";

import { useKnowledgeContext } from "@/contexts/KnowledgeContext";
import Form from "react-bootstrap/Form";

export default function SearchKnowledge() {
    const {
        search,
        setSearch,
    } = useKnowledgeContext();

    return (
        <Form.Control
            placeholder="Search knowledges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}