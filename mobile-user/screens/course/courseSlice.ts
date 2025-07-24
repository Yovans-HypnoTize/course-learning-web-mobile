import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

interface courseState {
  loading: boolean;
  error: string | null;

  subscribedCourseList: any;
  lessonListByCourse: any;
  lessonById:any,
  subscribePlansResponse: any;
  updateLessonPlaybackTimeResponse: any
}

const initialState: courseState = {
  loading: false,
  error: null,

  subscribedCourseList: null,
  lessonListByCourse: [],
  lessonById:null,
  subscribePlansResponse: null,
  updateLessonPlaybackTimeResponse:null
};

export const getSubscribedCourses = createAsyncThunk(
  'subscription/getSubscribedCourses',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('student/subscribeCourse');
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get course list',
      );
    }
  },
);

export const getLessonsByCourseId = createAsyncThunk(
  'subscription/getLessonsByCourseId',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`student/lessons/${id}`);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get lessons',
      );
    }
  },
);

export const getLessonById = createAsyncThunk(
  'subscription/getLessonById',
  async ({id, courseId}:any, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`student/lesson/${id}/${courseId}`);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get lesson',
      );
    }
  },
);

export const updateLessonPlaybackTime = createAsyncThunk(
  'subscription/updateLessonPlaybackTime',
  async ({lessonId, courseId, data}:any, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`student/watchHistory/${lessonId}/${courseId}`, data);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update playback time',
      );
    }
  },
);

export const subscribePlans = createAsyncThunk(
  'auth/subscribePlans',
  async (payload:any, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        'student/subscriptions',
        payload,
      );
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Subscription failed',
      );
    }
  },
);

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSubscribedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedCourseList = action.payload;
      })
      .addCase(getLessonsByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonListByCourse = action.payload;
      })
      .addCase(getLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonById = action.payload;
      })
      .addCase(updateLessonPlaybackTime.fulfilled, (state, action) => {
        state.loading = false;
        state.updateLessonPlaybackTimeResponse = action.payload;
      })
      .addCase(subscribePlans.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribePlansResponse = action.payload;
      })

      .addMatcher(
        isPending(getSubscribedCourses, getLessonsByCourseId, getLessonById,updateLessonPlaybackTime,subscribePlans),
        state => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isRejected(getSubscribedCourses, getLessonsByCourseId,getLessonById, updateLessonPlaybackTime, subscribePlans),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export default courseSlice.reducer;
