"use client";

import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Knowledge } from "../types/knowledge";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import KnowledgeModal from "./KnowledgeModal";
import useKnowledgeActions from "../hooks/useKnowledgeActions";
import Link from "next/link";

interface Props {
    article: Knowledge;
}

export default function KnowledgeCard({ article, }: Props) {
    const {
        update,
        remove,
    } = useKnowledgeActions();

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    async function handleDelete() {
        await remove(article.id);
        setShowDelete(false);
    }

    return (
        <>
            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <h5>
                            <Link href={`/knowledge/${article.id}`} className="text-decoration-none">{article.title}</Link>
                        </h5>
                    </div>
                    <hr />
                    <p>
                        {article.content.length > 200
                            ? article.content.substring(0, 200) + "..."
                            : article.content
                        }
                    </p>
                    <small className="text-muted">{new Date(article.createdAt).toLocaleString()}</small>
                    <div className="mt-3">
                        <Button size="sm" variant="outline-primary" className="me-2" onClick={() => setShowEdit(true)}>
                            Edit
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => setShowDelete(true)}>
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <KnowledgeModal show={showEdit} article={article} onClose={() => setShowEdit(false)} onSave={update} />
            <DeleteConfirmModal show={showDelete} title={article.title} onClose={() => setShowDelete(false)} onConfirm={handleDelete} />
        </>
    );
}