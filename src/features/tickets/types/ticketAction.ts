import { Ticket } from "./tickets";

export type TicketAction =
    | {
        type: "SET_LOADING";
        payload: boolean;
    }
    | {
        type: "SET_TICKETS";
        payload: Ticket[];
    }
    | {
        type: "ADD_TICKET";
        payload: Ticket;
    }
    | {
        type: "UPDATE_TICKET";
        payload: Ticket;
    }
    | {
        type: "DELETE_TICKET";
        payload: string;
    }
    | {
        type: "SET_SEARCH";
        payload: string;
    }
    | {
        type: "SET_STATUS_FILTER";
        payload: string;
    }
    | {
        type: "SET_PRIORITY_FILTER";
        payload: string;
    }
    | {
        type: "SET_SORT";
        payload: "newest" | "oldest";
    }
    | {
        type: "SET_CURRENT_PAGE";
        payload: number;
    };