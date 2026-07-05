import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/utils/validation";
import { useAuth } from "@/hooks/useAuth";

function Login() {
  const { login, isLoggingIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "Student",
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="min-h-[85vh] bg-zinc-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-zinc-900">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400 font-medium mt-1.5">
            Log in to manage your job search and applications
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-semibold text-zinc-700 mb-1">
                Email
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full border-zinc-200 shadow-none focus-visible:ring-primary"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-semibold text-zinc-700 mb-1">
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full border-zinc-200 shadow-none focus-visible:ring-primary"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-semibold text-zinc-700 mb-1">
                Role
              </Label>
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-650 hover:text-primary transition-colors font-medium">
                  <input
                    type="radio"
                    value="Student"
                    className="h-4 w-4 text-primary border-zinc-300 focus:ring-primary cursor-pointer"
                    {...register("role")}
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-650 hover:text-primary transition-colors font-medium">
                  <input
                    type="radio"
                    value="Recruiter"
                    className="h-4 w-4 text-primary border-zinc-300 focus:ring-primary cursor-pointer"
                    {...register("role")}
                  />
                  Recruiter
                </label>
              </div>
            </div>
            {errors.role && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.role.message}</p>
            )}
          </div>

          <div className="pt-2 space-y-4">
            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-none text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors focus:outline-none"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-zinc-550 font-medium">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-primary hover:text-primary/90 hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
