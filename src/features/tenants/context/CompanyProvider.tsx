"use client";

import { createContext, useContext, useEffect, useReducer, } from "react";
import { Company } from "../types/company";
import * as companyService from "../services/companyService";
import { useAuth } from "@/contexts/AuthContext";
import { companyReducer, initialCompanyState } from "../reducers/companyReducer";

interface CompanyContextType {
    companies: Company[];
    loading: boolean;
    loadCompanies: () => Promise<void>;
    addCompany: (data: companyService.CompanyRegistration) => Promise<void>;
    editCompany: (id: string, data: Partial<Company>) => Promise<void>;
    removeCompany: (id: string) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | null>(null);

export function CompanyProvider({ children, }: React.PropsWithChildren) {
    const [state, dispatch] = useReducer(companyReducer, initialCompanyState);
    const { platformUser, loading } = useAuth();

    async function loadCompanies() {
        try {
            dispatch({ type: "SET_LOADING", payload: true, });
            const data = await companyService.getCompanies();
            dispatch({ type: "SET_COMPANIES", payload: data, });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            dispatch({ type: "SET_LOADING", payload: false, });
        }
    }

    useEffect(() => {
        if (!loading && platformUser?.role === "ENTERPRISE") {
            loadCompanies();
        } else {
            dispatch({ type: "SET_COMPANIES", payload: [] });
        }
    }, [loading, platformUser]);

    async function addCompany(data: companyService.CompanyRegistration) {
        const company = await companyService.registerCompany(data);
        dispatch({ type: "ADD_COMPANY", payload: company, });
    }

    async function editCompany(id: string, data: Partial<Company>) {
        const updated = await companyService.updateCompany(id, data);
        dispatch({ type: "UPDATE_COMPANY", payload: updated, });
    }

    async function removeCompany(id: string) {
        await companyService.deleteCompany(id);
        dispatch({ type: "DELETE_COMPANY", payload: id, });
    }

    return (
        <CompanyContext.Provider
            value={{
                companies: state.companies,
                loading: state.loading,
                loadCompanies,
                addCompany,
                editCompany,
                removeCompany,
            }}>
            {children}
        </CompanyContext.Provider>
    );
}

export function useCompanyContext() {
    const context = useContext(CompanyContext);

    if (!context) {
        throw new Error("CompanyProvider missing");
    }

    return context;
}