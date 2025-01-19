import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import jobReducer from "./features/jobSlice";
import companyReducer from "./features/companySlice";
import applicationReducer from "./features/applicationSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
