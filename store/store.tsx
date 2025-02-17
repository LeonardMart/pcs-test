import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification/notificationSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
