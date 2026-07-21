"use client";

import { createContext, useContext, useEffect, useState, } from "react";
import { onAuthStateChanged, User, } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { PlatformUser } from "@/types/platformUser";
import { getCurrentProfile, logout } from "@/services/authService";
import { Roles } from "@/constants/roles";

interface AuthContextType {
    firebaseUser: User | null;
    platformUser: PlatformUser | null;
    loading: boolean;
    isEnterprise: boolean,
    isAdmin: boolean,
    isAgent: boolean,
    isUser: boolean,
    refreshProfile: () => Promise<void>;
    logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    firebaseUser: null,
    platformUser: null,
    loading: true,
    isEnterprise: false,
    isAdmin: false,
    isAgent: false,
    isUser: false,
    refreshProfile: () => Promise.resolve(),
    logoutUser: () => Promise.resolve(),
});

export function AuthProvider({ children, }: { children: React.ReactNode; }) {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [platformUser, setPlatformUser] = useState<PlatformUser | null>(null);
    const [loading, setLoading] = useState(true);

    async function refreshProfile() {
        if (!auth.currentUser) {
            setPlatformUser(null);
            return;
        }

        try {
            const profile = await getCurrentProfile();
            setPlatformUser(profile);
        } catch (error) {
            console.error(error);
            setPlatformUser(null);
        }
    }

    async function logoutUser() {
        await logout();

        setFirebaseUser(null);
        setPlatformUser(null);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            setFirebaseUser(user);

            if (user) {
                await refreshProfile();
            } else {
                setPlatformUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const isEnterprise = platformUser?.role === Roles.ENTERPRISE;
    const isAdmin = platformUser?.role === Roles.ADMIN;
    const isAgent = platformUser?.role === Roles.AGENT;
    const isUser = platformUser?.role === Roles.USER;

    return (
        <AuthContext.Provider value={{
            firebaseUser,
            platformUser,
            loading,
            isEnterprise,
            isAdmin,
            isAgent,
            isUser,
            refreshProfile,
            logoutUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}