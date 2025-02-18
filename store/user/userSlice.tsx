import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  position: string;
  role: string;
  join_date: string;
  location: string;
  check_in: string;
  check_out: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setCheckIn: (state) => {
      if (state.user) {
        state.user.check_in = new Date().toISOString();
      }
    },
    setCheckOut: (state) => {
      if (state.user) {
        state.user.check_out = new Date().toISOString();
      }
    },
  },
});

export const { setUser, setCheckIn, setCheckOut } = userSlice.actions;
export default userSlice.reducer;
