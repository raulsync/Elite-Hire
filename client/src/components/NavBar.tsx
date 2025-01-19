import { LogOut, User } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { USER_API } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { addUser } from "@/store/features/authSlice";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <Link
      to={to}
      className={`relative py-2 transition-colors ${
        isActiveRoute(to)
          ? "text-red-500 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
          : "hover:text-red-500"
      }`}
    >
      {children}
    </Link>
  );

  const handleDelete = async () => {
    try {
      const response = await axios.post(USER_API + "/logout", {
        withcredentials: true,
      });

      if (response && response.data && response.data.success) {
        dispatch(addUser(null));
        navigate("/");
        toast({
          description: response.data.message,
        });
      } else {
        console.error("Error logging out:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        toast({
          description: errorMessage,
        });
      } else {
        toast({
          description: "Unexpected error occurred!",
        });
      }
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto h-16 max-w-7xl px-4 lg:px-8">
        <div className="flex-shrink-0">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Elite<span className="font-semibold text-red-500">Hire</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8 font-medium">
            {user && user?.role === "Recruiter" ? (
              <>
                <li>
                  <NavLink to="/admin/companies">Companies</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/jobs">Jobs</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/browse">Browse</NavLink>
                </li>
                <li>
                  <NavLink to="/jobs">Job</NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button
                    className={`rounded-full border-2 border-red-500 transition-colors ${
                      isActiveRoute("/login")
                        ? "bg-red-50 text-red-500"
                        : "hover:bg-red-50"
                    }`}
                    variant="outline"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    className={`rounded-full transition-colors ${
                      isActiveRoute("/signup")
                        ? "bg-red-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                    variant="secondary"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer hover:opacity-90 transition-opacity ring-2 ring-offset-2 ring-red-500">
                    <AvatarImage
                      src={
                        user.profile?.profilePhoto ||
                        "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k="
                      }
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={
                            user.profile?.profilePhoto ||
                            "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k="
                          }
                        />
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {user.profile?.bio && (
                      <p className="text-sm text-muted-foreground border-t pt-2">
                        {user.profile.bio}
                      </p>
                    )}

                    <div className="flex flex-col gap-1 border-t pt-2">
                      {user?.role !== "Recruiter" && (
                        <Link to="/profile">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start gap-2 ${
                              isActiveRoute("/profile")
                                ? "text-red-500 bg-red-50"
                                : "hover:text-red-500"
                            }`}
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Button>
                        </Link>
                      )}
                      <Button
                        onClick={handleDelete}
                        variant="ghost"
                        className="w-full justify-start gap-2 hover:text-red-500"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
