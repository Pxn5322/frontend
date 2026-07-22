import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, User, UserCredential, } from "firebase/auth";
import { auth } from "../firebase/firebase";
import api from "./api";
import { PlatformUser } from "@/types/platformUser";

export interface RegisterRequest {
    uid: string;
    name: string;
    email: string;
    companyCode: string;
}

export async function registerUser(data: RegisterRequest) {
    const res = await api.post("/api/auth/register", data);
    return res.data;
}

export async function signup(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function logout() {
    await signOut(auth);
}

export async function getCurrentProfile(): Promise<PlatformUser> {
    const response = await api.get("/api/auth/me");
    console.log(response);
    return response.data;
}

export async function deleteAccount(user: User) {
    await deleteUser(user);
}