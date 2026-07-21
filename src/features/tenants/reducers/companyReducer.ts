import { CompanyAction } from "../types/companyAction";
import { CompanyState } from "../types/companyState";


export const initialCompanyState: CompanyState = {
    companies: [],
    loading: false,
};

export function companyReducer(state: CompanyState, action: CompanyAction): CompanyState {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_COMPANIES":
            return {
                ...state,
                companies: action.payload,
            };
        case "ADD_COMPANY":
            return {
                ...state,
                companies: [
                    action.payload,
                    ...state.companies,
                ],
            };
        case "UPDATE_COMPANY":
            return {
                ...state,
                companies: state.companies.map(company =>
                    company.id === action.payload.id
                        ? action.payload
                        : company
                ),
            };
        case "DELETE_COMPANY":
            return {
                ...state,
                companies: state.companies.filter(
                    company => company.id !== action.payload
                ),
            };
        default:
            return state;
    }
}