import { LogOut, User } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();

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
          ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
          : "hover:text-primary text-zinc-600"
      }`}
    >
      {children}
    </Link>
  );

  const handleDelete = () => {
    logout();
  };

  return (
    <nav className="bg-white/85 backdrop-blur-md border-b border-zinc-200/50 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto h-16 max-w-7xl px-4 lg:px-8">
        <div className="flex-shrink-0">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Elite<span className="font-semibold text-primary">Hire</span>
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
                    className={`rounded-full border-2 border-primary transition-colors text-primary ${
                      isActiveRoute("/login")
                        ? "bg-primary/10"
                        : "hover:bg-primary/10"
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
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-primary hover:bg-primary/90"
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
                  <Avatar className="cursor-pointer hover:opacity-90 transition-opacity ring-2 ring-offset-2 ring-primary">
                    <AvatarImage
                      src={
                        user.profile?.profilePhoto ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
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
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
                          }
                        />
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg text-zinc-900">{user.name}</h3>
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
                                ? "text-primary bg-primary/10"
                                : "hover:text-primary text-zinc-700"
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
                        className="w-full justify-start gap-2 hover:text-primary text-zinc-700"
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
