"use client";

import Alert from "react-bootstrap/Alert";

interface Props {
    message: string;
}

export default function EmptyState({ message, }: Props) {
    return (
        <Alert variant="secondary">
            {message}
        </Alert>
    );
}