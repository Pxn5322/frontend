"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function TestAuth() {
    const { firebaseUser, loading, } = useAuth();

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="container mt-5">
            <h2> Current User </h2>
            <hr />
            <pre>
                {JSON.stringify(firebaseUser, null, 2)}
            </pre>
        </div>
    );
}