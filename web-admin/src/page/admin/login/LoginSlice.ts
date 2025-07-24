import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { AuthService } from "../../../services/authServices";


interface AuthState {
    loading: boolean;
    error: string | null;
    loginSuccess: boolean,
    loginPayload: any,
    AdminLogoutPayload: any,
    AdminLogoutSuccess: boolean,
    AdminChangepwPayload: any,
    AdminChangepwtSuccess: boolean
}

const initialState: AuthState = {
    loading: false,
    error: null,
    loginSuccess: false,
    loginPayload: [],
    AdminLogoutSuccess: false,
    AdminLogoutPayload: [],
    AdminChangepwPayload: [],
    AdminChangepwtSuccess: false
};


export const adminLogin = createAsyncThunk(
    'admin/login',
    async (values: any, { rejectWithValue }) => {
        try {
            const response = await AuthService.Adminlogin(values);
            return response;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error?.response?.data?.message || 'Login failed');
        }
    }
);


export const AdminChangePassword = createAsyncThunk(
    'admin/ChangePassword',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await AuthService.AdminChangePassword(payload);
            return response;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || 'Change password failed');
        }
    }
);


export const AdminLogout = createAsyncThunk(
    'admin/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.AdminLogout();
            return response;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);



const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.loginSuccess = false;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.loginSuccess = true;
                state.loginPayload = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                console.log(action?.payload);
                state.loading = false;
                state.error = action.error.message || 'Login failed';
                state.loginSuccess = false;
            })

            .addCase(AdminChangePassword.pending, (state) => {
                state.loading = true;
                state.AdminChangepwtSuccess = false;
            })
            .addCase(AdminChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.AdminChangepwtSuccess = true;
                state.AdminChangepwPayload = action.payload;
            })
            .addCase(AdminChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Logout failed';
                state.AdminChangepwtSuccess = false;
            })

            .addCase(AdminLogout.pending, (state) => {
                state.loading = true;
                state.AdminLogoutSuccess = false;
            })
            .addCase(AdminLogout.fulfilled, (state, action) => {
                state.loading = false;
                state.AdminLogoutSuccess = true;
                state.AdminLogoutPayload = action.payload;
            })
            .addCase(AdminLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Logout failed';
                state.AdminLogoutSuccess = false;
            });
    }
});

export default loginSlice.reducer;
