import { Knowledge } from "../types/knowledge";

export type SortOption =
    | "newest"
    | "oldest";

export function sortKnowledges(knowledges: Knowledge[], option: SortOption): Knowledge[] {
    const sorted = [...knowledges];

    switch (option) {
        case "oldest":
            return sorted.sort((a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
        default:
            return sorted.sort((a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
    }
}