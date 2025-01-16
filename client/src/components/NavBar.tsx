import { LogOut, User } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { USER_API } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { addUser } from "@/store/features/authSlice";

function NavBar() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await axios.post(USER_API + "/logout", {
        withcredentials: true,
      });

      console.log(response);
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
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto h-16 max-w-7xl">
        <div>
          <h1
            onClick={() => navigate("/")}
            className="text-3xl  font-extrabold cursor-pointer "
          >
            Elite<span className="font-semibold text-red-500">Hire</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-5 font-medium">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/browse"}>Browse</Link>
            </li>
            <li>
              <Link to={"jobs"}>Job</Link>
            </li>
          </ul>
          <div>
            {!user ? (
              <div className="flex items-center gap-4">
                <Link to={"/login"}>
                  <Button
                    className="rounded-full border-2  border-red-600"
                    variant={"outline"}
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button
                    variant={"secondary"}
                    className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.profile?.profilePhoto} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.profile?.profilePhoto} />
                      </Avatar>
                      <h3 className="font-medium">{user.name}</h3>
                    </div>
                    <div className="">
                      <p className="text-sm text-muted-foreground">
                        {user.profile?.bio}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <User className="h-5 text-muted-foreground" />
                        <Button variant={"link"}>
                          <Link to={"/profile"}>Profile</Link>
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <LogOut className="h-5 text-muted-foreground" />
                        <Button
                          onClick={handleDelete}
                          variant={"link"}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
