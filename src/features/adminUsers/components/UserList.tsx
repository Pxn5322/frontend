"use client";

import useAdminUsers from "../hooks/useAdminUsers";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import UserCard from "./UserCard";

export default function UserList() {
    const {
        users,
        loading,
    } = useAdminUsers();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (users.length === 0) {
        return (
            <EmptyState message="No users found." />
        );
    }

    return (
        <>
            {users.map(user => (<UserCard key={user.id} user={user} />))}
        </>
    );
}