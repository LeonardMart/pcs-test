import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: number;
  type: string;
  status: string;
  date: string;
  seen: boolean;
  submission_request?: string
  reimburse?: string
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    markAsSeen: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.map((notif) =>
        notif.id === action.payload ? { ...notif, seen: true } : notif
      );
    },
  },
});

export const { setNotifications, markAsSeen } = notificationSlice.actions;
export default notificationSlice.reducer;
