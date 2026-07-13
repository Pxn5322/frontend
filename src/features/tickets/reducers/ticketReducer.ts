import { TicketAction } from "../types/ticketAction";
import { TicketState } from "../types/ticketState";


export const initialTicketState: TicketState = {
    tickets: [],
    loading: false,
    search: "",
    statusFilter: "",
    priorityFilter: "",
    sort: "newest",
    currentPage: 1,
    pageSize: 10,
};

export function ticketReducer(state: TicketState, action: TicketAction): TicketState {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_TICKETS":
            return {
                ...state,
                tickets: action.payload,
            };
        case "ADD_TICKET":
            return {
                ...state,
                tickets: [
                    action.payload,
                    ...state.tickets,
                ],
            };
        case "UPDATE_TICKET":
            return {
                ...state,
                tickets: state.tickets.map(ticket =>
                    ticket.id === action.payload.id
                        ? action.payload
                        : ticket
                ),
            };
        case "DELETE_TICKET":
            return {
                ...state,
                tickets: state.tickets.filter(
                    ticket => ticket.id !== action.payload
                ),
            };
        case "SET_SEARCH":
            return {
                ...state,
                search: action.payload,
            };
        case "SET_STATUS_FILTER":
            return {
                ...state,
                statusFilter: action.payload,
            };
        case "SET_PRIORITY_FILTER":
            return {
                ...state,
                priorityFilter: action.payload,
            };
        case "SET_SORT":
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