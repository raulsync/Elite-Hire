import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profile?: {
    bio?: string;
    skills?: string[];
    profilePhoto?: string;
    resumeUrl?: string;
    resumeName?: string;
  };
  role: "Student" | "Recruiter";
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUser } = authSlice.actions;

export default authSlice.reducer;
