"use client";

import { useCompanyContext } from "../context/CompanyProvider";

export default function useCompanies() {
    const {
        companies,
        loading,
        loadCompanies,
    } = useCompanyContext();

    return {
        companies,
        loading,
        refresh: loadCompanies,
    };
}