"use client";

import toast from "react-hot-toast";
import { useKnowledgeContext, } from "@/contexts/KnowledgeContext";

export default function useKnowledgeActions() {
    const {
        addKnowledge,
        editKnowledge,
        removeKnowledge,
    } = useKnowledgeContext();

    async function create(title: string, content: string) {
        try {
            await addKnowledge(
                title,
                content
            );

            toast.success("Knowledge article created.");
        } catch {
            toast.error("Unable to create article.");
        }
    }

    async function update(id: string, title: string, content: string) {
        try {
            await editKnowledge(id, {
                title,
                content,
            });

            toast.success("Article updated.");
        } catch {
            toast.error("Unable to update article.");
        }
    }

    async function remove(id: string) {
        try {
            await removeKnowledge(id);
            toast.success("Article deleted.");
        } catch {
            toast.error("Unable to delete article.");
        }
    }

    return {
        create,
        update,
        remove,
    };
}