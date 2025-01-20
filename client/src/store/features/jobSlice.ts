import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  experience?: number;
  salary: string;
  jobType: string;
  position: string;
  status: string;
  company: {
    _id: string;
    name: string;
    logo: string;
  };
  created_by: string;
  applications: { applicant: string }[];
  createdAt: string;
  updatedAt: string;
}

interface JobState {
  jobs: Job[];
  oneJob: Job | null;
  adminJobs: Job[];
  searchJob: string;
  allAppliedJobs: Job[];
  searchQuery: string;
}

const initialState: JobState = {
  jobs: [],
  oneJob: null,
  adminJobs: [],
  searchJob: "",
  allAppliedJobs: [],
  searchQuery: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJobs(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload;
    },
    addOneJob(state, action: PayloadAction<Job>) {
      state.oneJob = action.payload;
    },
    setAdminJobs(state, action: PayloadAction<Job[]>) {
      state.adminJobs = action.payload;
    },
    setSearchJob(state, action: PayloadAction<string>) {
      state.searchJob = action.payload;
    },
    setAllAppliedJobs(state, action: PayloadAction<Job[]>) {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addJobs,
  addOneJob,
  setAdminJobs,
  setSearchJob,
  setSearchQuery,
  setAllAppliedJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
