"use client";

import { Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import useTenants from "../hooks/useTenants";
import TenantCard from "./TenantCard";
import TenantModal from "./TenantModal";
import DeleteTenantModal from "./DeleteTenantModal";
import { Tenant } from "../types/tenant";
import * as tenantService from "../services/tenantService";
import toast from "react-hot-toast";

export default function TenantList() {
    const {
        tenants,
        loading,
        refresh,
    } = useTenants();

    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

    function openCreate() {
        setSelectedTenant(null);
        setShowModal(true);
    }

    function openEdit(tenant: Tenant) {
        setSelectedTenant(tenant);
        setShowModal(true);
    }

    function openDelete(tenant: Tenant) {
        setSelectedTenant(tenant);
        setShowDelete(true);
    }

    async function save(companyName: string) {
        try {
            if (selectedTenant) {
                await tenantService.updateTenant(selectedTenant.id, companyName);
                toast.success("Tenant updated");
            } else {
                await tenantService.createTenant(companyName);
                toast.success("Tenant created");
            }

            await refresh();
            setShowModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Unable to save tenant");
        }
    }

    async function deleteTenant() {
        if (!selectedTenant) return;

        try {
            await tenantService.deleteTenant(selectedTenant.id);
            toast.success("Tenant deleted");
            await refresh();
            setShowDelete(false);
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete tenant");
        }
    }

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <div className="mb-4">
                <button className="btn btn-primary" onClick={openCreate}>
                    + Create Tenant
                </button>
            </div>
            {tenants.length === 0
                ? (<Alert variant="secondary">No tenants found.</Alert>)
                : (tenants.map(tenant => (
                    <TenantCard
                        key={tenant.id}
                        tenant={tenant}
                        onEdit={() => openEdit(tenant)}
                        onDelete={() => openDelete(tenant)}
                    />
                )))}

            <TenantModal
                show={showModal}
                tenant={selectedTenant}
                onClose={() => setShowModal(false)}
                onSave={save}
            />

            <DeleteTenantModal
                show={showDelete}
                tenant={selectedTenant}
                onClose={() => setShowDelete(false)}
                onDelete={deleteTenant}
            />
        </>
    );
}