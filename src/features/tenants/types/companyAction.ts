import { Company } from "./company";

export type CompanyAction =
    | {
        type: "SET_LOADING";
        payload: boolean;
    }
    | {
        type: "SET_COMPANIES";
        payload: Company[];
    }
    | {
        type: "ADD_COMPANY";
        payload: Company;
    }
    | {
        type: "UPDATE_COMPANY";
        payload: Company;
    }
    | {
        type: "DELETE_COMPANY";
        payload: string;
    };