"use client";

import { createContext, useContext, useEffect, useReducer, ReactNode, } from "react";
import { useAuth } from "./AuthContext";
import { knowledgeReducer, initialKnowledgeState, } from "@/features/knowledge/reducers/knowledgeReducer";
import * as knowledgeService from "@/features/knowledge/services/knowledgeService";
import { Knowledge } from "@/features/knowledge/types/knowledge";
import { KnowledgeContextType } from "@/features/knowledge/types/knowledgeContext";

const KnowledgeContext = createContext<KnowledgeContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function KnowledgeProvider({ children, }: Props) {
    const [state, dispatch] = useReducer(knowledgeReducer, initialKnowledgeState);
    const { firebaseUser, loading: authLoading, } = useAuth();

    async function loadKnowledge() {
        dispatch({ type: "SET_LOADING", payload: true, });
        try {
            const data = await knowledgeService.getKnowledge();
            dispatch({ type: "SET_ARTICLES", payload: data, });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false, });
        }
    }

    useEffect(() => {
        if (!authLoading && firebaseUser) {
            loadKnowledge();
        } else {
            dispatch({ type: "SET_ARTICLES", payload: [] });
        }
    }, [authLoading, firebaseUser]);

    async function addKnowledge(title: string, content: string) {
        const article = await knowledgeService.createKnowledge({
            title,
            content,
        });

        dispatch({ type: "ADD_ARTICLE", payload: article, });
    }

    async function editKnowledge(id: string, data: Partial<Knowledge>) {
        const article = await knowledgeService.updateKnowledge(
            id,
            data
        );

        dispatch({ type: "UPDATE_ARTICLE", payload: article, });
    }

    async function removeKnowledge(id: string) {
        await knowledgeService.deleteKnowledge(id);
        dispatch({ type: "DELETE_ARTICLE", payload: id, });
    }

    function setSearch(search: string) {
        dispatch({ type: "SET_SEARCH_ARTICLE", payload: search, });
    }

    function setSort(sort: "newest" | "oldest") {
        dispatch({ type: "SET_SORT_ARTICLE", payload: sort, });
    }

    function setCurrentPage(page: number) {
        dispatch({ type: "SET_CURRENT_PAGE", payload: page, });
    }

    return (
        <KnowledgeContext.Provider value={{
            articles: state.articles,
            loading: state.loading,
            search: state.search,
            sort: state.sort,
            currentPage: state.currentPage,
            pageSize: state.pageSize,
            setSearch,
            setSort,
            setCurrentPage,
            loadKnowledge,
            addKnowledge,
            editKnowledge,
            removeKnowledge,
        }}>
            {children}
        </KnowledgeContext.Provider>
    );
}

export function useKnowledgeContext() {
    const context = useContext(KnowledgeContext);

    if (!context) {
        throw new Error("useKnowledgeContext must be used inside KnowledgeProvider");
    }

    return context;
}