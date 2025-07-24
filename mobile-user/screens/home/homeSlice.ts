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

  subscriptionStatus:any;
  previewCourseList: any;
  previewLessonByCourse:any;
  subscribedCourseList: any;
  lessonListByCourse: any;
  updateLessonPlaybackTimeResponse:any;
}

const initialState: courseState = {
  loading: false,
  error: null,

  subscriptionStatus:null,
  previewCourseList: null,
  previewLessonByCourse: null,
  subscribedCourseList: null,
  lessonListByCourse: [],
  updateLessonPlaybackTimeResponse:null
};

export const getSubscriptionStatus = createAsyncThunk('home/getSubscriptionStatus', async(_WORKLET, thunkAPI) => {
  try {
    const response = await axiosInstance.get('student/subscriptionsStatus');
    return response;
  } catch(err:any){
    return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get status',
      );
  }
})

export const getPreviewCourses = createAsyncThunk(
  'home/getPreviewCourses',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('student/preview/course');
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get preview course list',
      );
    }
  },
);

export const getSubscribedCourses = createAsyncThunk(
  'home/getSubscribedCourses',
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

export const getLessonByCourseId = createAsyncThunk(
  'home/getLessonByCourseId',
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

export const getPreviewLessonByCourseId = createAsyncThunk(
  'home/getPreviewLessonByCourseId',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`student/preview/lesson/${id}`);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get lessons',
      );
    }
  },
);

export const updatePreviewLessonPlaybackTime = createAsyncThunk(
  'subscription/updatePreviewLessonPlaybackTime',
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


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionStatus = action.payload;
      })
      .addCase(getPreviewCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.previewCourseList = action.payload;
      })
      .addCase(getSubscribedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedCourseList = action.payload;
      })
      .addCase(getLessonByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonListByCourse = action.payload;
      })
      .addCase(getPreviewLessonByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.previewLessonByCourse = action.payload;
      })
      .addCase(updatePreviewLessonPlaybackTime.fulfilled, (state, action) => {
              state.loading = false;
              state.updateLessonPlaybackTimeResponse = action.payload;
            })
      

      .addMatcher(
        isPending(getSubscriptionStatus,getPreviewCourses,getSubscribedCourses, getLessonByCourseId,getPreviewLessonByCourseId, updatePreviewLessonPlaybackTime),
        state => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isRejected(getSubscriptionStatus,getPreviewCourses,getSubscribedCourses, getLessonByCourseId,getPreviewLessonByCourseId,updatePreviewLessonPlaybackTime),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export default homeSlice.reducer;
