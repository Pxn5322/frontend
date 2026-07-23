"use client";

import EnterpriseGuard from "@/components/auth/EnterpriseGuard";
import DashboardLayout from "@/components/DashboardLayout";
import EnterpriseDashboardContent from "@/features/enterprise/components/EnterpriseDashboardContent";

export default function EnterpriseDashboard() {
    return (
        <EnterpriseGuard>
            <DashboardLayout>
                <EnterpriseDashboardContent />
            </DashboardLayout>
        </EnterpriseGuard >
    );
}