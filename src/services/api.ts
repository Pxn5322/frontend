import axios from "axios";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
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
        const router = useRouter();

        if (error.response?.status === 401) {
            await logout();
            router.replace("/login");
        }

        return Promise.reject(error);
    }
);

export default api;