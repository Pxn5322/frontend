import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import AdminUsersContent from "@/features/adminUsers/components/AdminUsersContent";
import { AdminUserProvider } from "@/features/adminUsers/context/AdminUserProvider";

export default function AdminUsersPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <AdminUserProvider>
                    <AdminUsersContent />
                </AdminUserProvider>
            </DashboardLayout>
        </ProtectedRoute>
    );
}