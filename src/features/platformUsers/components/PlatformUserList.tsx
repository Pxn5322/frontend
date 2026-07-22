"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import usePlatformUsers from "../hooks/usePlatformUsers";
import PlatformUserCard from "./PlatformUserCard";

export default function PlatformUserList() {
    const {
        users,
        loading,
    } = usePlatformUsers();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (users.length === 0) {
        return (<EmptyState message="No users found." />);
    }

    return (
        <>
            {users?.map(user => (<PlatformUserCard key={user.id} user={user} />))}
        </>
    );
}