import axios from "axios";
import { baseApi } from "../../interceptor";
import { BASE_URL } from "../config/config";


export const AuthService = {

    Adminlogin: async (payload: any) => {
        const response = await axios.post(`${BASE_URL}v1/auth/login`, payload);
        return response.data;
    },

    AdminChangePassword: async (payload: any) => {
        const response = await baseApi.post('v1/auth/reset-password', payload);
        return response.data;
    },

    AdminLogout: async () => {
        const response = await baseApi.post('v1/auth/logout');
        return response.data;
    },

    CreateTeachers: async (payload: any) => {
        const response = await baseApi.post("v1/admin/teacher", payload);
        return response.data;
    },

    TeachersList: async () => {
        const response = await baseApi.get('v1/admin/teacher');
        return response.data;
    },

    TeachersEdit: async (id: any, payload: any) => {
        const response = await baseApi.put(`v1/admin/teacher/${id}`, payload);
        return response.data;
    },

    TeachersGetById: async (id: number) => {
        const response = await baseApi.get(`v1/admin/teacher/${id}`);
        return response.data;
    },

    TeachersDelete: async (id: number) => {
        const response = await baseApi.delete(`v1/admin/teacher/${id}`);
        return response.data;
    },

    TeacherChangePassword: async (payload: any) => {
        const response = await baseApi.post('v1/teacher/reset-password', payload);
        return response.data;
    },

    TeacherForgotPW: async (payload: any) => {
        const response = await baseApi.post('v1/teacher/forgot-password', payload);
        return response.data;
    },

    CourseUpload: async (payload: FormData) => {
        const response = await baseApi.post('v1/teacher/course', payload);
        return response.data;
    },

    GetLessons: async () => {
        const response = await baseApi.get("v1/teacher/lessons");
        return response.data;
    },

    CourseListing: async (page: any, size: any, search:any) => {
        const response = await baseApi.get(`v1/teacher?page=${page}&size=${size}&search=${search}`);

        return response.data;
    },

    fetchSubscriptionsList: async (page: any, size: any, type: any, course: any, duration: any) => {
        const response = await baseApi.get(`v1/admin/subscriptions/list?page=${page}&size=${size}&type=${type}&course=${course}&duration=${duration}`);
        return response.data;
    },

    GetSubscriptions: async () => {
        const response = await baseApi.get("v1/admin/subscriptions");
        return response.data;
    },


    CreateSubscriptions: async (payload: any) => {
        const response = await baseApi.post("v1/admin/subscriptions", payload);
        return response.data;
    },

    GetByIdSubscription: async (id: any) => {
        const response = await baseApi.get(`v1/admin/subscriptions/${id}`);
        return response.data;
    },

    UpdateSubscription: async (id: number, data: any) => {
        const response = await baseApi.put(`v1/admin/subscriptions/${id}`, data);
        return response.data;
    },

    deleteSubscription: async (id: number) => {
        const response = await baseApi.delete(`v1/admin/subscriptions/${id}`);
        return response.data
    }

}
