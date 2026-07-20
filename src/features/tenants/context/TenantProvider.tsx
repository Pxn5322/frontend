"use client";

import { createContext, useContext, useEffect, useState, } from "react";
import { Tenant } from "../types/tenant";
import * as tenantService from "../services/tenantService";

interface TenantContextType {
    tenants: Tenant[];
    loading: boolean;
    refresh: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | null>(null);

export function TenantProvider({ children, }: React.PropsWithChildren) {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);

    async function refresh() {
        setLoading(true);

        try {
            const data = await tenantService.getTenants();
            setTenants(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <TenantContext.Provider
            value={{
                tenants,
                loading,
                refresh,
            }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenantContext() {
    const context = useContext(TenantContext);

    if (!context) {
        throw new Error("TenantProvider missing");
    }

    return context;
}