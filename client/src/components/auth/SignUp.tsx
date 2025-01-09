import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import React, { useState } from "react";
import axios from "axios";
import { USER_API } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

interface IState {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  file?: File | string;
}

function SignUp() {
  const [input, setInput] = useState<IState>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        USER_API + "/register",
        {
          name: input.name,
          email: input.email,
          password: input.password,
          phoneNumber: input.phoneNumber,
          role: input.role,
          file: input.file,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/login");
        toast({
          description: response.data.message,
        });
      } else {
        toast({
          description: response.data.message,
        });
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
    <div className="mx-auto h-[90vh] max-w-7xl flex items-center justify-center">
      <div className="w-1/2 items-center justify-center gap-4  flex my-36 flex-col border border-gray-100 shadow-md rounded-xl">
        <h1 className="font-semibold text-xl mt-4">
          Sign <span className="text-red-600">Up</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" w-[90%] my-4 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={input.name}
                name="name"
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={handleInputChange}
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
                name="password"
                value={input.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleInputChange}
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
                  <Input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={handleInputChange}
                    className="cursor-pointer"
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
                  <Input
                    type="radio"
                    name="role"
                    className="cursor-pointer"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={handleInputChange}
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
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full text-sm text-gray-500 cursor-pointer "
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none"
            >
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
