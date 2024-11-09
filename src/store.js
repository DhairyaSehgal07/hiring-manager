import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsSlice";
import usersReducer from "./slices/userSlice";
import assessmentsReducer from "./slices/assessmentSlice";
const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    users: usersReducer,
    assessments: assessmentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
