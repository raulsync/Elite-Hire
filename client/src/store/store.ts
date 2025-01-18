import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import jobReducer from "./features/jobSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
