"use client";

import { useKnowledgeContext, } from "@/contexts/KnowledgeContext";

export default function useKnowledge() {
    const {
        articles,
        loading,
        loadKnowledge,
    } = useKnowledgeContext();

    return {
        articles,
        loading,
        refresh: loadKnowledge,
    };
}