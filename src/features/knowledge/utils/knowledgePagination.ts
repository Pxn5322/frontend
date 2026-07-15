import { Knowledge } from "../types/knowledge";

export function paginateKnowledge(knowledges: Knowledge[], currentPage: number, pageSize: number): Knowledge[] {
    const start = (currentPage - 1) * pageSize;

    return knowledges.slice(start, start + pageSize);
}