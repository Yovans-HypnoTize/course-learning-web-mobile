import { configureStore } from "@reduxjs/toolkit";
import adminLoginReducer from "../page/admin/login/LoginSlice";
import TeacherListReducer from "../page/admin/teacher/TeacherSlice";
import TeacherLoginReducer from "../page/teacher/TeacherLoginSlice";
import courseManagementReducer from "../page/teacher/TeacherLoginSlice";
import SubscriptionReducer from "../page/admin/subscription/SubscriptionSlice";

export const store = configureStore({
    reducer: {
        adminLogin: adminLoginReducer,
        teacherList: TeacherListReducer,
        teacherLogin: TeacherLoginReducer,
        courseManagement: courseManagementReducer,
        Subscription: SubscriptionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
