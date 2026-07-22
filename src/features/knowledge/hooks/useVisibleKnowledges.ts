"use client";

import { useEffect } from "react";
import { useKnowledgeContext } from "../context/KnowledgeContext";
import { filterBySearch } from "../selectors/knowledgeSelectors";
import { sortKnowledges } from "../utils/knowledgeSort";
import { paginateKnowledge } from "../utils/knowledgePagination";

export default function useVisibleKnowledges() {
    const {
        articles,
        loading,
        search,
        sort,
        currentPage,
        pageSize,
        setCurrentPage,
    } = useKnowledgeContext();

    useEffect(() => {
        setCurrentPage(1);
    }, [search, sort,]);

    const searchedKnowledges = filterBySearch(
        articles,
        search
    );

    const sortedKnowledges = sortKnowledges(
        searchedKnowledges,
        sort
    );

    const visibleKnowledges = paginateKnowledge(
        sortedKnowledges,
        currentPage,
        pageSize
    );

    return {
        currentPage,
        pageSize,
        setCurrentPage,
        visibleKnowledges,
        loading,
        totalKnowledges: sortedKnowledges.length,
        totalPages: Math.ceil(sortedKnowledges.length / pageSize),
    };
}