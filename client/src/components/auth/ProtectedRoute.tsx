import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProtectedRouteProps {
  allowedRoles?: Array<"Student" | "Recruiter">;
  guestOnly?: boolean;
}

export const ProtectedRoute = ({ allowedRoles, guestOnly }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (guestOnly) {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
