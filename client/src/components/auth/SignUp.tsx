import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpInput } from "@/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import React from "react";

function SignUp() {
  const { signUp, isSigningUp } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "Student",
    },
  });

  const onSubmit = (data: SignUpInput) => {
    signUp(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file);
    }
  };

  return (
    <div className="mx-auto h-[90vh] max-w-7xl flex items-center justify-center">
      <div className="w-1/2 items-center justify-center gap-4  flex my-36 flex-col border border-gray-100 shadow-md rounded-xl">
        <h1 className="font-semibold text-xl mt-4">
          Sign <span className="text-red-600">Up</span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full  border-gray-300 shadow-sm "
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>
              )}
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
                    value="Student"
                    className="cursor-pointer"
                    id="r1"
                    {...register("role")}
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
                    className="cursor-pointer"
                    value="Recruiter"
                    id="r2"
                    {...register("role")}
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
            {errors.role && (
              <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>
            )}

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
              {errors.file && (
                <p className="mt-1 text-xs text-red-600">{(errors.file.message as string)}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {isSigningUp ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> loading...{" "}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none"
              >
                Sign up
              </Button>
            )}

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
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
