import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  position: string;
  jobType: string;
  salary: string;
  company: {
    name: string;
    logo: string;
  };
}

interface JobState {
  jobs: Job[];
  oneJob: Job | null;
  adminJobs: Job[];
  searchJobByText: string;
  allAppliedJobs: Job[];
  searchQuery: string;
}

const initialState: JobState = {
  jobs: [],
  oneJob: null,
  adminJobs: [],
  searchJobByText: "",
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
    setSearchJobByText(state, action: PayloadAction<string>) {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs(state, action: PayloadAction<Job[]>) {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addJobs,
  addOneJob,
  setAdminJobs,
  setSearchJobByText,
  setSearchedQuery,
  setAllAppliedJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
