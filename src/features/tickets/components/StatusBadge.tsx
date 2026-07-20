"use client";

import { Badge } from "react-bootstrap";

interface Props {
    status: string;
}

export default function StatusBadge({ status, }: Props) {
    let bg: | "success" | "warning" | "secondary" = "secondary";

    switch (status) {
        case "OPEN":
            bg = "warning";
            break;
        case "RESOLVED":
            bg = "success";
            break;
        default:
            bg = "secondary";
    }

    return (
        <Badge bg={bg} className="px-2.5 py-1.5 fw-semibold text-uppercase">
            {status.replace('_', ' ')}
        </Badge>
    );

}