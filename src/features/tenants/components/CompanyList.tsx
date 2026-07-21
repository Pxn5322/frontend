"use client";

import useCompanies from "../hooks/useCompanies";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

export default function CompanyList() {
    const {
        companies,
        loading,
    } = useCompanies();

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (companies.length === 0) {
        return (
            <EmptyState message="No companies found." />
        );
    }

    return (
        <>
            {companies?.map(company => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </>
    );
}