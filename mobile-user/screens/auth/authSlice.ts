import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { storeDataInCookie } from '../../utils/Utils';
import axiosInstance from '../../lib/axios';

interface AuthState {
  isAuthTokenLoading: boolean;
  isSignedIn: boolean;

  loading: boolean;
  error: string | null;

  loginUserResponse: any;
  registerUserResponse: any;
  logoutResponse: any;
  forgotPasswordResponse: any;
  otpVerifyResponse: any;
  resetPasswordResponse: any;
}

const initialState: AuthState = {
  isAuthTokenLoading: true,
  isSignedIn: false,

  loading: false,
  error: null,

  loginUserResponse: null,
  registerUserResponse: null,
  logoutResponse: null,
  forgotPasswordResponse: null,
  otpVerifyResponse: null,
  resetPasswordResponse: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('student/login', credentials);
      await storeDataInCookie('access_token', response.data.accessToken);
      await storeDataInCookie('refresh_token', response.data.refreshToken);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Login failed',
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    credentials: {
      name: string;
      email: string;
      phoneNo: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.post(
        'student/register',
        credentials,
      );
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Register failed',
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post('student/logout');
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Logout failed',
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (credentials: { email: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        'student/forgot-password',
        credentials,
      );
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Forgot password failed',
      );
    }
  },
);

export const otpVerify = createAsyncThunk(
  'auth/otpVerify',
  async (credentials: { otpNo: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        'student/otp-verify',
        credentials,
      );
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to sent OTP',
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    credentials: {
      newPassword: string;
      confirmPassword: string;
      token: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.post(
        'student/reset-password',
        credentials,
      );
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Reset password failed',
      );
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleAuthTokenLoading: state => {
      state.isAuthTokenLoading = false;
    },
    handleSignIn: state => {
      state.isSignedIn = true;
    },
    handleSignOut: state => {
      state.isSignedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('loginuser acton payload', action.payload);
        state.loading = false;
        state.loginUserResponse = action.payload;
        state.isSignedIn = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('registeruser acton payload', action.payload);
        state.loading = false;
        state.registerUserResponse = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log('logoutuser acton payload', action.payload);
        state.loading = false;
        state.logoutResponse = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordResponse = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordResponse = action.payload;
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerifyResponse = action.payload;
      })

      .addMatcher(
        isPending(
          loginUser,
          registerUser,
          logoutUser,
          forgotPassword,
          resetPassword,
          otpVerify,
        ),
        state => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isRejected(
          loginUser,
          registerUser,
          logoutUser,
          forgotPassword,
          resetPassword,
          otpVerify,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export const { handleAuthTokenLoading, handleSignIn, handleSignOut } =
  authSlice.actions;

export default authSlice.reducer;
