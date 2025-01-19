import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Applicant {
  _id: string;
  job: string;
  applicant: string;
  status: "accepted" | "rejected" | "pending";
  createdAt: string;
  updatedAt: string;
}

interface ApplicationState {
  applicants: Applicant[] | null;
}

const initialState: ApplicationState = {
  applicants: null,
};
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addApplicants: (state, action: PayloadAction<Applicant[]>) => {
      state.applicants = action.payload;
    },
  },
});

export const { addApplicants } = applicationSlice.actions;

export default applicationSlice.reducer;
