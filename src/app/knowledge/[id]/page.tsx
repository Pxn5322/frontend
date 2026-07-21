"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import KnowledgeDetails from "@/features/knowledge/components/KnowledgeDetails";

import { use } from "react";

interface Props {
    params: Promise<{ id: string; }>;
}

export default function KnowledgeDetailsPage({ params, }: Props) {
    const { id } = use(params);

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <KnowledgeDetails articleId={id} />
            </DashboardLayout>
        </ProtectedRoute>
    );
}