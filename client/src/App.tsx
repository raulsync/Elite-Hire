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
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addUser } from "./store/features/authSlice";
import { authService } from "./services/authService";

function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.success) {
      dispatch(addUser(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-slate-600 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
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

        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
        </Route>

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
