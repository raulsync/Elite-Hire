import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function SignUp() {
  return (
    <div className="mx-auto h-[90vh] max-w-7xl flex items-center justify-center">
      <div className="w-1/2 items-center justify-center gap-4  flex my-36 flex-col border border-gray-100 shadow-md rounded-xl">
        <h1 className="font-semibold text-xl mt-4">Sign Up</h1>
        <form className=" w-[90%] my-4 space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Enter your name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full  border-gray-300 shadow-sm "
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
              />
            </div>

            <div className=" flex items-center gap-4">
              <Label className="block text-sm font-medium text-gray-700">
                I am a
              </Label>
              <RadioGroup
                defaultValue="Student"
                className="flex"
              >
                <div className="flex items-center">
                  <RadioGroupItem
                    value="Student"
                    id="r1"
                  />
                  <Label
                    htmlFor="r1"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Student
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem
                    value="Recruiter"
                    id="r2"
                  />
                  <Label
                    htmlFor="r2"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </Label>
              <div className="mt-1 flex items-center cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 cursor-pointer "
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none">
              Sign up
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
