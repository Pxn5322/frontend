import { Knowledge } from "./knowledge";

export type KnowledgeAction =
    | {
        type: "SET_LOADING";
        payload: boolean;
    }
    | {
        type: "SET_ARTICLES";
        payload: Knowledge[];
    }
    | {
        type: "ADD_ARTICLE";
        payload: Knowledge;
    }
    | {
        type: "UPDATE_ARTICLE";
        payload: Knowledge;
    }
    | {
        type: "DELETE_ARTICLE";
        payload: string;
    }
    | {
        type: "SET_SEARCH_ARTICLE";
        payload: string;
    }
    | {
        type: "SET_SORT_ARTICLE";
        payload: "newest" | "oldest";
    }
    | {
        type: "SET_CURRENT_PAGE";
        payload: number;
    };