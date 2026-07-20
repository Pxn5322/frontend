"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {

  const router = useRouter();

  const {
    platformUser,
    loading
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (platformUser) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [loading, platformUser]);

  return null;
}