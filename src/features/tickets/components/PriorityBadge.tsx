"use client";

import { Badge } from "react-bootstrap";

interface Props {
    priority: string;
}

export default function PriorityBadge({ priority, }: Props) {
    let bg: | "danger" | "warning" | "primary" | "success" | "secondary" = "secondary";

    switch (priority) {
        case "CRITICAL":
            bg = "danger";
            break;
        case "HIGH":
            bg = "warning";
            break;
        case "MEDIUM":
            bg = "primary";
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