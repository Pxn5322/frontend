"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function TestAuth() {
    const { currentUser, loading, } = useAuth();

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="container mt-5">
            <h2> Current User </h2>
            <hr />
            <pre>
                {JSON.stringify(currentUser, null, 2)}
            </pre>
        </div>
    );
}