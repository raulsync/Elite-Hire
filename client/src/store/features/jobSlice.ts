import { createSlice } from "@reduxjs/toolkit";

interface jobState {
  jobs: [];
  oneJob: string | null;
}

const initialState: jobState = {
  jobs: [],
  oneJob: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJobs(state, action) {
      state.jobs = action.payload;
    },
    addOneJob(state, action) {
      state.oneJob = action.payload;
    },
  },
});

export const { addJobs, addOneJob } = jobSlice.actions;
export default jobSlice.reducer;
