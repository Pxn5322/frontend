"use client";

import { Card, Badge } from "react-bootstrap";

interface Props {
    summary?: string;
    suggestedReply?: string;
    confidence?: number;
    analyzed?: boolean;
    loading?: boolean;
    onGenerate: () => void;
}

export default function AIAnalysisCard({ loading, summary, suggestedReply, confidence, analyzed, onGenerate }: Props) {
    if (loading) {
        return (
            <Card className="mt-4">
                <Card.Body>
                    <p>🤖 Generating AI analysis...</p>
                    <p>Generating usually takes around 2 minutes.</p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="mt-4 border-primary">
            <Card.Header className="d-flex justify-content-between">
                <strong>🤖 AI Analysis</strong>
                <Badge bg={analyzed ? "success" : "secondary"}>
                    {analyzed ? "Ready" : "Pending"}
                </Badge>
            </Card.Header>
            <Card.Body>
                <h6>Summary</h6>
                {!analyzed
                    ? (<p>Generating AI analysis...</p>)
                    : (<p>{summary ?? "This ticket has not been analyzed yet."}</p>)
                }
                <hr />
                <h6>Suggested Reply</h6>
                {!analyzed
                    ? (<p>Generating AI analysis...</p>)
                    : (<p>{suggestedReply ?? "AI suggestion unavailable."}</p>)
                }
                <hr />
                <small>Confidence{" "}{confidence ?? "--"}%</small>
            </Card.Body>
        </Card>
    );
}