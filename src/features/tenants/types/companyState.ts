import { Company } from "./company";

export interface CompanyState {
    companies: Company[];
    loading: boolean;
}