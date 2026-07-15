"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import KnowledgeCard from "./KnowledgeCard";
import EmptyState from "@/components/ui/EmptyState";
import useVisibleKnowledges from "../hooks/useVisibleKnowledges";
import PaginationBar from "@/components/ui/PaginationBar";

export default function KnowledgeList() {
    const {
        currentPage,
        pageSize,
        setCurrentPage,
        visibleKnowledges,
        loading,
        totalKnowledges
    } = useVisibleKnowledges();

    if (loading)
        return <LoadingSpinner />;

    if (visibleKnowledges.length === 0)
        return (
            <EmptyState message="No articles found." />
        );

    return (
        <>
            <PaginationBar currentPage={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage} total={totalKnowledges} />
            {visibleKnowledges.map(article => (
                <KnowledgeCard key={article.id} article={article} />
            ))}
        </>
    );
}