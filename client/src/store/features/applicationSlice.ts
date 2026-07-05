import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PopulatedApplicant {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  profile: {
    bio?: string;
    skills?: string[];
    profilePhoto?: string;
    resumeUrl?: string;
    resumeName?: string;
  };
}

export interface PopulatedApplication {
  _id: string;
  job: string;
  applicant: PopulatedApplicant;
  status: "accepted" | "rejected" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedJob {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  experience: number;
  jobType: string;
  position: string;
  company: string;
  created_by: string;
  applications: PopulatedApplication[];
  createdAt: string;
  updatedAt: string;
}

interface ApplicationState {
  applicants: PopulatedJob | null;
}

const initialState: ApplicationState = {
  applicants: null,
};
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addApplicants: (state, action: PayloadAction<PopulatedJob>) => {
      state.applicants = action.payload;
    },
  },
});

export const { addApplicants } = applicationSlice.actions;

export default applicationSlice.reducer;
