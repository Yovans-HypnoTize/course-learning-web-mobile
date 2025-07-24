import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../../../services/authServices';

interface Subscription {
    id?: number;
    _id?: number;
    role?: string;
    courseLevel?: string;
    planName?: string;
    planSelection?: string;
    planDescription?: string;
    userCounts?: number;
    price: number;
    status?: boolean;
}

interface SubscriptionState {
    loading: boolean;
    error: string | null;
    subscriptions: any;
    selectedSubscription: Subscription | null;
    selectedListSubscription: any;
    createSuccess: boolean;
    updateSuccess: boolean;
    deleteSuccess: boolean;
}

const initialState: SubscriptionState = {
    loading: false,
    error: null,
    subscriptions: null,
    selectedSubscription: null,
    selectedListSubscription: null,
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
};


export const fetchSubscriptionsList = createAsyncThunk(
    'subscription/fetchAllbylist',
    async ({ page, size, type, course, duration }: { page: number; size: number; type: any; course: any; duration: any }, { rejectWithValue }) => {
        try {
            const res = await AuthService.fetchSubscriptionsList(page, size, type, course, duration);
            return res;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch');
        }
    }
);

export const fetchSubscriptions = createAsyncThunk(
    'subscription/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await AuthService.GetSubscriptions();
            return res;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch');
        }
    }
);

export const createSubscription = createAsyncThunk(
    'subscription/create',
    async (payload: any, { rejectWithValue }) => {
        try {
            const res = await AuthService.CreateSubscriptions(payload);
            return res;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to create');
        }
    }
);

export const GetByIdSubscription = createAsyncThunk(
    'subscription/GetByIdSubscription',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await AuthService.GetByIdSubscription(id);
            return res;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch');
        }
    }
);

export const updateSubscription = createAsyncThunk(
    'subscription/update',
    async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
        try {
            const res = await AuthService.UpdateSubscription(id, data);
            return res;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to update');
        }
    }
);


export const deleteSubscription = createAsyncThunk(
    'subscription/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await AuthService.deleteSubscription(id);
            return res;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to delete');
        }
    }
);

const SubscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        clearSubscriptionState: (state) => {
            state.createSuccess = false;
            state.updateSuccess = false;
            state.deleteSuccess = false;
            state.error = null;
        },
        // clearSelectedListSubscription: (state) => {
        //     state.selectedListSubscription = null;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
                state.loading = false;
                state.subscriptions = action.payload;
            })

            .addCase(fetchSubscriptionsList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.subscriptions = action.payload;
                state.selectedListSubscription = action.payload.data; // use .data part for modal views
            })

            .addCase(GetByIdSubscription.fulfilled, (state, action: PayloadAction<Subscription>) => {
                state.loading = false;
                state.selectedSubscription = action.payload;
            })

            .addCase(createSubscription.fulfilled, (state) => {
                state.loading = false;
                state.createSuccess = true;
            })

            .addCase(updateSubscription.fulfilled, (state) => {
                state.loading = false;
                state.updateSuccess = true;
            })

            .addCase(deleteSubscription.fulfilled, (state) => {
                state.loading = false;
                state.deleteSuccess = true;
            })

            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.loading = false;
                    state.error = (action.payload as string) || 'Something went wrong';
                }
            );
    }
});

export const { clearSubscriptionState } = SubscriptionSlice.actions;
export default SubscriptionSlice.reducer;
