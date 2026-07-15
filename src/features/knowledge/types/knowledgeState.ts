import { SortOption } from "../utils/knowledgeSort";
import { Knowledge } from "./knowledge";

export interface KnowledgeState {
    articles: Knowledge[];
    loading: boolean;
    search: string;
    sort: SortOption;
    currentPage: number;
    pageSize: number;
}