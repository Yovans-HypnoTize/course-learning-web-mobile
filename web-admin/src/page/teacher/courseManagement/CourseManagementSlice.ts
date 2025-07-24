import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../../../services/authServices";


interface Question {
    type: string;
    question: string;
    options: string[];
    answer: string;
}

interface CourseFormData {
    lessonTitle: string;
    videoFile: File | null;
    questions: Question[];
    description: string;
    mark: number | null;
}

interface CourseState {
    loading: boolean;
    error: string | null;
    CourseUploadPayload: boolean;
    CourseUploadSuccess: boolean;
    formData: CourseFormData;
    GetLessonspayload: any;
    GetLessonsSuccess: boolean;
    CourseListingpayload: any;
    CourseListingSuccess: boolean;
}

const initialState: CourseState = {
    loading: false,
    error: null,
    CourseUploadPayload: false,
    CourseUploadSuccess: false,
    GetLessonsSuccess: false,
    GetLessonspayload: [],
    CourseListingpayload: [],
    CourseListingSuccess: false,
    formData: {
        lessonTitle: "",
        videoFile: null,
        questions: [],
        description: "",
        mark: null,
    },
};

export const CourseUpload = createAsyncThunk(
    "courseManagement/CourseUpload",
    async (payload: FormData, { rejectWithValue }) => {
        try {
            const response = await AuthService.CourseUpload(payload);
            return response;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Upload failed");
        }
    }
);


export const GetLessons = createAsyncThunk(
    "courseManagement/getLesson",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.GetLessons();
            return response;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Get Lesson failed")
        }
    }
);


export const CourseListing = createAsyncThunk(
    "CourseManagement/courseListing",
    async ({ page, size, search }: { page: number; size: number; search: any }, { rejectWithValue }) => {

        try {
            const response = await AuthService.CourseListing(page, size, search);
            return response;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Get Lesson failed")
        }
    }
);


const courseManagementSlice = createSlice({
    name: "courseManagement",
    initialState,
    reducers: {
        setLessonDetails: (state, action: PayloadAction<{ lessonTitle: string; videoFile: File | null; description: string }>) => {
            state.formData.lessonTitle = action.payload.lessonTitle;
            state.formData.videoFile = action.payload.videoFile;
            state.formData.description = action.payload.description;
        },
        addQuestion: (state, action: PayloadAction<Question>) => {
            state.formData.questions.push(action.payload);
        },
        setMark: (state, action: PayloadAction<number>) => {
            state.formData.mark = action.payload;
        },
        clearCourseForm: (state) => {
            state.formData = initialState.formData;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(CourseUpload.pending, (state) => {
                state.loading = true;
                state.CourseUploadSuccess = false;
            })
            .addCase(CourseUpload.fulfilled, (state, action) => {
                state.loading = false;
                state.CourseUploadSuccess = true;
                state.CourseUploadPayload = action.payload;
            })
            .addCase(CourseUpload.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.CourseUploadSuccess = false;
            })

            .addCase(GetLessons.pending, (state) => {
                state.loading = true;
                state.GetLessonsSuccess = false;
            })
            .addCase(GetLessons.fulfilled, (state, action) => {
                state.loading = false;
                state.GetLessonsSuccess = true;
                state.GetLessonspayload = action.payload;
            })
            .addCase(GetLessons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.GetLessonsSuccess = false;
            })

            .addCase(CourseListing.pending, (state) => {
                state.loading = true;
                state.CourseListingSuccess = false;
            })
            .addCase(CourseListing.fulfilled, (state, action) => {
                state.loading = false;
                state.CourseListingSuccess = true;
                state.CourseListingpayload = action.payload;
            })
            .addCase(CourseListing.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.CourseListingSuccess = false;
            })
    },
});

export const { setLessonDetails, addQuestion, setMark, clearCourseForm } = courseManagementSlice.actions;
export default courseManagementSlice.reducer;
