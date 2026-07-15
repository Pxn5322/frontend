"use client";

import { useEffect, useState } from "react";
import { Card, Spinner, } from "react-bootstrap";
import * as knowledgeService from "../services/knowledgeService";
import { Knowledge } from "../types/knowledge";

interface Props {
    articleId: string;
}

export default function KnowledgeDetails({ articleId, }: Props) {
    const [
        article,
        setArticle,
    ] = useState<Knowledge | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await knowledgeService.getKnowledgeArticle(articleId);
                setArticle(data);
            } finally {
                setLoading(false);
            }
        }

        if (articleId) {
            load();
        }
    }, [articleId]);

    if (loading)
        return <Spinner />;

    if (!article)
        return (
            <Card>
                <Card.Body>Article not found.</Card.Body>
            </Card>
        );

    return (
        <Card className="shadow">
            <Card.Body>
                <h2>{article.title}</h2>
                <hr />
                <p style={{ whiteSpace: "pre-wrap" }}>{article.content}</p>
                <hr />
                <small>Created{" "}{new Date(article.createdAt).toLocaleString()}</small>
            </Card.Body>
        </Card>
    );
}