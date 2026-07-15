import { Knowledge } from "../types/knowledge";

export function filterBySearch(knowledges: Knowledge[], search: string): Knowledge[] {
    if (!search.trim()) {
        return knowledges;
    }

    const keyword = search.toLowerCase();

    return knowledges.filter(knowledge =>
        knowledge.title.toLowerCase().includes(keyword) ||
        knowledge.content.toLowerCase().includes(keyword)
    );
}