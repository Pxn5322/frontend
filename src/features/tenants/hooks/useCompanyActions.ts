"use client";

import toast from "react-hot-toast";
import { useCompanyContext } from "../context/CompanyProvider";
import { CompanyRegistration } from "../services/companyService";
import { Company } from "../types/company";

export default function useCompanyActions() {
    const {
        addCompany,
        editCompany,
        removeCompany,
    } = useCompanyContext();

    async function create(data: CompanyRegistration) {
        try {
            await addCompany(data);
            toast.success("Company created.");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to create company.");
        }
    }

    async function update(id: string, data: Partial<Company>) {
        try {
            await editCompany(id, data);
            toast.success("Company updated.");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to update company.");
        }
    }

    async function remove(id: string) {
        try {
            await removeCompany(id);
            toast.success("Company deleted.");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Unable to delete company.");
        }
    }

    return {
        create,
        update,
        remove,
    };
}