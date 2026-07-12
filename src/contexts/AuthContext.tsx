"use client";

import { createContext, useContext, useEffect, useState, } from "react";
import { onAuthStateChanged, User, } from "firebase/auth";
import { auth } from "../firebase/firebase";
import api from "@/services/api";
import { PlatformUser } from "@/types/platformUser";

interface AuthContextType {
    firebaseUser: User | null;
    platformUser: PlatformUser | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    firebaseUser: null,
    platformUser: null,
    loading: true,
});

export function AuthProvider({ children, }: { children: React.ReactNode; }) {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [platformUser, setPlatformUser] = useState<PlatformUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setFirebaseUser(user);

            if (user) {
                try {
                    const response = await api.get("/api/auth/me");
                    setPlatformUser(response.data);
                } catch (error) {
                    console.error(error);
                    setPlatformUser(null);
                }
            } else {
                setPlatformUser(null);
            }
            setLoading(false);
        }
        );
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ firebaseUser, platformUser, loading, }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}