"use client";

import api from "@/services/api";

export default function TestToken() {
    async function test() {
        const response = await api.get("/api/test");
        console.log(response.data);
    }

    return (
        <button onClick={test}>Test Token</button>
    );
}