import axios from "axios";
import { signOutAction } from "./auth";

//VITE_API_BASE_URL="http://localhost:3333/api"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        const isLoginPage = window.location.pathname === "/login";

        if (error.response.status === 401 && !isLoginPage) {
            originalRequest._retry = true;

            try {
                await api.post("/auth/refresh");
                return api(originalRequest);
            } catch (err) {
                signOutAction();
                return Promise.reject(err);
            }
        }

        if (error.response.status === 403 && !isLoginPage) {
            signOutAction();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);
