import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../screens/auth/authSlice';
import accountReducer from '../screens/account/accountSlice';
import subscriptionReducer from '../screens/subscription/subscriptionSlice';
import courseReducer from '../screens/course/courseSlice';
import homeReducer from '../screens/home/homeSlice';
import ticketReducer from '../screens/ticket/ticketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    account: accountReducer,
    subscription: subscriptionReducer,
    course: courseReducer,
    ticket: ticketReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
