import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { AuthService } from "../../../services/authServices";

interface AuthState {
    loading: boolean;
    error: string | null;
    TeacherListSuccess: boolean,
    TeacherListPayload: any,
    TeachersEditSuccess: boolean,
    TeachersEditPayload: any,
    TeachersGetByIdSuccess: boolean,
    TeachersGetByIdPayload: any,
    TeachersDeletePayload: any,
    TeachersDeleteSuccess: boolean,
    CreateTeachersPayload: any,
    CreateTeachersSuccess: boolean,

}

const initialState: AuthState = {
    loading: false,
    error: null,
    TeacherListSuccess: false,
    TeacherListPayload: [],
    TeachersEditSuccess: false,
    TeachersEditPayload: [],
    TeachersGetByIdSuccess: false,
    TeachersGetByIdPayload: [],
    TeachersDeleteSuccess: false,
    TeachersDeletePayload: [],
    CreateTeachersPayload: [],
    CreateTeachersSuccess: false,
};

export const CreateTeachers = createAsyncThunk(
    "admin/createteacher",
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await AuthService.CreateTeachers(payload);
            return response;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Failed to Delete the teacher");
        }
    }
);


export const TeachersList = createAsyncThunk(
    'admin/teacherlist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.TeachersList();
            return response;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || 'Teacher list fetch failed');
        }
    }
);


export const TeachersEdit = createAsyncThunk(
    'admin/teacheredit',
    async ({ id, data }: { id: number; data: any }, { rejectWithValue }: any) => {
        try {
            const response = await AuthService.TeachersEdit(id, data);
            return response;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || 'Teacher list fetch failed');
        }
    }
);


export const TeachersGetById = createAsyncThunk(
    "admin/teacher/getById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await AuthService.TeachersGetById(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch teacher");
        }
    }
);


export const TeachersDelete = createAsyncThunk(
    "admin/teacherDelete",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await AuthService.TeachersDelete(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Failed to Delete the teacher");
        }
    }
);


const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(CreateTeachers.pending, (state) => {
                state.loading = true;
                state.CreateTeachersSuccess = false;
            })
            .addCase(CreateTeachers.fulfilled, (state, action) => {
                state.loading = false;
                state.CreateTeachersSuccess = true;
                state.CreateTeachersPayload = action.payload;
            })
            .addCase(CreateTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Teacher Creation failed';
                state.CreateTeachersSuccess = false;
            })

            .addCase(TeachersList.pending, (state) => {
                state.loading = true;
                state.TeacherListSuccess = false;
            })
            .addCase(TeachersList.fulfilled, (state, action) => {
                state.loading = false;
                state.TeacherListSuccess = true;
                state.TeacherListPayload = action.payload;
            })
            .addCase(TeachersList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Teacher List fetch failed';
                state.TeacherListSuccess = false;
            })


            .addCase(TeachersEdit.pending, (state) => {
                state.loading = true;
                state.TeachersEditSuccess = false;
            })
            .addCase(TeachersEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.TeachersEditSuccess = true;
                state.TeachersEditPayload = action.payload;
            })
            .addCase(TeachersEdit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Teacher Edit failed';
                state.TeachersEditSuccess = false;
            })


            .addCase(TeachersGetById.pending, (state) => {
                state.loading = true;
                state.TeachersGetByIdSuccess = false;
            })
            .addCase(TeachersGetById.fulfilled, (state, action) => {
                state.loading = false;
                state.TeachersGetByIdSuccess = true;
                state.TeachersGetByIdPayload = action.payload;
            })
            .addCase(TeachersGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Teacher details fetch failed';
                state.TeachersGetByIdSuccess = false;
            })

            .addCase(TeachersDelete.pending, (state) => {
                state.loading = true;
                state.TeachersDeleteSuccess = false;
            })
            .addCase(TeachersDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.TeachersDeleteSuccess = true;
                state.TeachersDeletePayload = action.payload;
            })
            .addCase(TeachersDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Teacher details fetch failed';
                state.TeachersDeleteSuccess = false;
            });

    }
});

export default teacherSlice.reducer;
