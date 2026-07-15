import { KnowledgeState } from "../types/knowledgeState";
import { KnowledgeAction } from "../types/lnowledgeAction";

export const initialKnowledgeState: KnowledgeState = {
    articles: [],
    loading: false,
    search: "",
    sort: "newest",
    currentPage: 1,
    pageSize: 10,
};

export function knowledgeReducer(state: KnowledgeState, action: KnowledgeAction): KnowledgeState {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_ARTICLES":
            return {
                ...state,
                articles: action.payload,
            };
        case "ADD_ARTICLE":
            return {
                ...state,
                articles: [action.payload, ...state.articles,],
            };
        case "UPDATE_ARTICLE":
            return {
                ...state,
                articles: state.articles.map(article => article.id === action.payload.id ? action.payload : article),
            };
        case "DELETE_ARTICLE":
            return {
                ...state,
                articles: state.articles.filter(article => article.id !== action.payload),
            };
        case "SET_SEARCH_ARTICLE":
            return {
                ...state,
                search: action.payload,
            };
        case "SET_SORT_ARTICLE":
            return {
                ...state,
                sort: action.payload,
            };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
}