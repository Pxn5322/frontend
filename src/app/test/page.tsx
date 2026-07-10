"use client";
import api from "@/lib/api";

export default function Test() {
    async function test() {
        const response = await api.get("/");
        console.log(response.data);
    }

    return (
        <button onClick={test}>
            Test Backend
        </button>
    )
}