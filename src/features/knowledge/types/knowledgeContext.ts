import { Knowledge } from "./knowledge";

export interface KnowledgeContextType {
    articles: Knowledge[];
    loading: boolean;
    search: string;
    sort: "newest" | "oldest";
    currentPage: number;
    pageSize: number;
    setSearch: (value: string) => void;
    setSort(sort: "newest" | "oldest"): void;
    setCurrentPage(page: number): void;
    loadKnowledge: () => Promise<void>;
    addKnowledge: (title: string, content: string) => Promise<void>;
    editKnowledge: (id: string, data: Partial<Knowledge>) => Promise<void>;
    removeKnowledge: (id: string) => Promise<void>;
}