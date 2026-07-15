"use client";

import Card from "react-bootstrap/Card";

interface Props {
    title: string;
    value: number;
}

export default function StatCard({ title, value, }: Props) {
    return (
        <Card className="shadow-sm h-100">
            <Card.Body>
                <h6 className="text-muted">{title}</h6>
                <h2 className="mt-3">{value}</h2>
            </Card.Body>
        </Card>
    );
}