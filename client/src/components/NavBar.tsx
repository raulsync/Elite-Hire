import { LogOut, User } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import RippleButton from "./ui/ripple-button";

function NavBar() {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between h-16 max-w-17">
        <div>
          <h1 className="text-2xl font-bold">
            job <span className="font-semibold text-red-500">HUB</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-5 font-medium">
            <li>Home</li>
            <li>Browse</li>
            <li>Job</li>
          </ul>
          <div>
            {!user ? (
              <div className="flex items-center gap-4">
                <Button variant={"outline"}>Login</Button>
                <Button
                  variant={"secondary"}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Register
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                      <h3 className="font-medium">Rahul Anand</h3>
                    </div>
                    <div className="">
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <User className="h-5 text-muted-foreground" />
                        <Button variant={"link"}>Profile</Button>
                      </div>
                      <div className="flex items-center">
                        <LogOut className="h-5 text-muted-foreground" />
                        <Button variant={"link"}>Logout</Button>
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
