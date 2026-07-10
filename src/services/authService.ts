import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, } from "firebase/auth";
import { auth } from "../firebase";

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