import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import NavBar from "./components/NavBar";
import Jobs from "./pages/Jobs";
import BrowseJobs from "./pages/BrowseJobs";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/jobs"
          element={<Jobs />}
        />
        <Route
          path="/browse"
          element={<BrowseJobs />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
