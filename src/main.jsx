import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import JobDetailsScreen from "./screens/JobDetailsScreen.jsx";
import UserdetailsScreen from "./screens/UserdetailsScreen.jsx";
import AssessmentScreen from "./screens/AssessmentScreen.jsx";
import CreateAssessmentScreen from "./screens/CreateAssessmentScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/jobs/:id" element={<JobDetailsScreen />} />
      <Route path="/jobs/:id/assessment" element={<AssessmentScreen />} />
      <Route path="/users/:id" element={<UserdetailsScreen />} />
      <Route path="/create-assessment" element={<CreateAssessmentScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
