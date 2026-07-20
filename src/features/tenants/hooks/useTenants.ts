import { useTenantContext } from "../context/TenantProvider";

export default function useTenants() {
    return useTenantContext();
}