import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

interface TicketState {
  loading: boolean;
  error: string | null;

  courseList: any;
  plansListByCourse: any;
  subscribePlansResponse: any;
}

const initialState: TicketState = {
  loading: false,
  error: null,

  courseList: null,
  plansListByCourse: [],
  subscribePlansResponse: null,
};

export const getCourseList = createAsyncThunk(
  'subscription/getCourseList',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('student/courseLevel');
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get course list',
      );
    }
  },
);

export const getPlansListByCourseId = createAsyncThunk(
  'subscription/getPlansListByCourseId',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`student/plans/${id}`);
      console.log('plans get slice', response);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get plans',
      );
    }
  },
);

export const subscribePlans = createAsyncThunk(
  'auth/subscribePlans',
  async (payload: any, thunkAPI) => {
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

export const ticketSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCourseList.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(getPlansListByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.plansListByCourse = action.payload;
      })
      .addCase(subscribePlans.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribePlansResponse = action.payload;
      })

      .addMatcher(
        isPending(getCourseList, getPlansListByCourseId, subscribePlans),
        state => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isRejected(getCourseList, getPlansListByCourseId, subscribePlans),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export default ticketSlice.reducer;
