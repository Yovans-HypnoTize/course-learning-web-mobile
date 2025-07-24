import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

interface AccountState {
  loading: boolean;
  error: string | null;

  userDetails: any;
}

const initialState: AccountState = {
  loading: false,
  error: null,

  userDetails: null,
};

export const getUser = createAsyncThunk(
  'account/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('student');
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to get user',
      );
    }
  },
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })

      .addMatcher(isPending(getUser), state => {
        state.loading = true;
        state.error = null;
      })

      .addMatcher(isRejected(getUser), (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default accountSlice.reducer;
