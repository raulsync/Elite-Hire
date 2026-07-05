import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import NavBar from "./components/NavBar";
import Jobs from "./pages/Jobs";
import BrowseJobs from "./pages/BrowseJobs";
import ProfilePage from "./pages/ProfilePage";
import JobDetails from "./pages/JobDetails";
import Company from "./pages/admin/company/Company";
import CreateCompany from "./pages/admin/company/CreateCompany";
import EditCompany from "./pages/admin/company/EditCompany";
import AdminJobs from "./pages/admin/jobs/AdminJobs";
import CreateJobs from "./pages/admin/jobs/CreateJobs";
import Applicants from "./pages/admin/Applicants";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/jobs"
          element={<Jobs />}
        />
        <Route
          path="/detail/:id"
          element={<JobDetails />}
        />
        <Route
          path="/browse"
          element={<BrowseJobs />}
        />

        {/* Guest-only Routes (Auth) */}
        <Route element={<ProtectedRoute guestOnly />}>
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Route>

        {/* Logged-in User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
        </Route>

        {/* Recruiter-only Routes */}
        <Route element={<ProtectedRoute allowedRoles={["Recruiter"]} />}>
          <Route
            path="/admin/companies"
            element={<Company />}
          />
          <Route
            path="/admin/companies/create"
            element={<CreateCompany />}
          />
          <Route
            path="/admin/companies/:id"
            element={<EditCompany />}
          />
          <Route
            path="/admin/jobs"
            element={<AdminJobs />}
          />
          <Route
            path="/admin/jobs/create"
            element={<CreateJobs />}
          />
          <Route
            path="/admin/jobs/:id/applicants"
            element={<Applicants />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
