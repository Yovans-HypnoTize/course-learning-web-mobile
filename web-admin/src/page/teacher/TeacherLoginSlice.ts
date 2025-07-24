import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { AuthService } from "../../services/authServices";


interface AuthState {
    loading: boolean;
    error: string | null;
    loginSuccess: boolean,
    loginPayload: any,
    TeacherChangepwPayload: any,
    TeaceherChangepwtSuccess: boolean,
    forgotpwPayload: any,
    forgotpwSuccess: boolean,
}

const initialState: AuthState = {
    loading: false,
    error: null,
    loginSuccess: false,
    loginPayload: [],
    TeaceherChangepwtSuccess: false,
    TeacherChangepwPayload: [],
    forgotpwPayload: [],
    forgotpwSuccess: false,
};


export const TeacherChangePassword = createAsyncThunk(
    'admin/ChangePassword',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await AuthService.TeacherChangePassword(payload);
            return response;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || 'Change password failed');
        }
    }
);

export const TeacherForgotPW = createAsyncThunk(
    'admin/forgotPassword',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await AuthService.TeacherForgotPW(payload);
            return response;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || 'Email send failed');
        }
    }
);


const teacherLoginSlice = createSlice({
    name: "teacherLogin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(TeacherChangePassword.pending, (state) => {
                state.loading = true;
                state.TeaceherChangepwtSuccess = false;
            })
            .addCase(TeacherChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.TeaceherChangepwtSuccess = true;
                state.TeacherChangepwPayload = action.payload;
            })
            .addCase(TeacherChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Logout failed';
                state.TeaceherChangepwtSuccess = false;
            })

            .addCase(TeacherForgotPW.pending, (state) => {
                state.loading = true;
                state.forgotpwSuccess = false;
            })
            .addCase(TeacherForgotPW.fulfilled, (state, action) => {
                state.loading = false;
                state.forgotpwSuccess = true;
                state.forgotpwPayload = action.payload;
            })
            .addCase(TeacherForgotPW.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Logout failed';
                state.forgotpwSuccess = false;
            })
    }
});

export default teacherLoginSlice.reducer;
