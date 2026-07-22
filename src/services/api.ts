import axios from "axios";
import { auth } from "@/firebase/firebase";
import { logout } from "./authService";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            try {
                await logout();
            } catch (e) {
                console.error(e);
            }
        }

        return Promise.reject(error);
    }
);

export default api;