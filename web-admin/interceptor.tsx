import axios, { type InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface ApiError {
    message?: string;
    detail?: string;
    validationMessage?: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseApi = axios.create({
    baseURL: BASE_URL,
});

baseApi.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        const access_token = Cookies.get('access_token');
        if (config.headers && access_token) {
            config.headers['Authorization'] = `${access_token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


baseApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    handleBadRequest(error.response.data);
                    break;
                case 401:
                    handleUnauthorized(error.response.data);
                    break;
                case 404:
                    handleNotFound(error.response.data);
                    break;
                case 500:
                    handleServerError(error.response.data);
                    break;
                default:
                    toast.error("An unexpected error occurred.");
                    break;
            }
        } else {
            toast.error("Network error. Please check your connection.");
        }
        return Promise.reject(error);
    }
);


function handleBadRequest(error: ApiError) {
    toast.error(error.message || "Bad Request");
}

function handleUnauthorized(error: ApiError) {
    toast.error(error.message || "Unauthorized access");
}

function handleNotFound(error: ApiError) {
    toast.error(error.message || "Resource not found");
}

function handleServerError(error: ApiError) {
    toast.error(error.validationMessage || "Internal server error");
}

export { baseApi };
