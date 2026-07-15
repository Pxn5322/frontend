"use client";

import { Card, Badge } from "react-bootstrap";

interface Props {
    summary?: string;
    suggestedReply?: string;
    confidence?: number;
    analyzed?: boolean;
}

export default function AIAnalysisCard({ summary, suggestedReply, confidence, analyzed, }: Props) {
    return (
        <Card className="mt-4 border-primary">
            <Card.Header className="d-flex justify-content-between">
                <strong>AI Analysis</strong>
                <Badge bg={analyzed ? "success" : "secondary"}>
                    {analyzed ? "Ready" : "Pending"}
                </Badge>
            </Card.Header>
            <Card.Body>
                <h6>Summary</h6>
                <p>{summary ?? "This ticket has not been analyzed yet."}</p>
                <hr />
                <h6>Suggested Reply</h6>
                <p>{suggestedReply ?? "AI suggestion unavailable."}</p>
                <hr />
                <small>Confidence{" "}{confidence ?? "--"}%</small>
            </Card.Body>
        </Card>
    );
}