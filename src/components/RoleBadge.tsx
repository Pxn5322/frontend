"use client";

import { Roles } from "@/constants/roles";
import { Badge } from "react-bootstrap";

interface Props {
    role: string;
}

export default function RoleBadge({ role, }: Props) {
    let bg: | "danger" | "warning" | "primary" | "success" | "secondary" = "secondary";

    switch (role) {
        case Roles.ENTERPRISE:
            bg = "danger";
            break;
        case Roles.ADMIN:
            bg = "warning";
            break;
        case Roles.AGENT:
            bg = "primary";
            break;
        case Roles.USER:
            bg = "success";
            break;
        default:
            bg = "secondary";
    }

    return (
        <Badge bg={bg} text="dark" className="ms-1 px-1.5 py-0.5" style={{ fontSize: "0.65rem" }}>
            {role}
        </Badge>
    );
}