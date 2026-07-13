"use client";

import { Badge } from "react-bootstrap";

interface Props {
    priority: string;
}

export default function PriorityBadge({ priority, }: Props) {
    let bg: | "danger" | "warning" | "success" | "secondary" = "secondary";

    switch (priority) {
        case "HIGH":
            bg = "danger";
            break;
        case "MEDIUM":
            bg = "warning";
            break;
        case "LOW":
            bg = "success";
            break;
        default:
            bg = "secondary";
    }

    return (
        <Badge bg={bg}>
            {priority}
        </Badge>
    );
}