import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "@/services/authService";
import { addUser } from "@/store/features/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { LoginInput, SignUpInput } from "@/utils/validation";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (data) => {
      if (data?.success) {
        dispatch(addUser(data?.data));
        navigate("/");
        toast({
          description: data?.message || "Login successful!",
        });
      } else {
        toast({
          description: data?.message || "Failed to login.",
        });
      }
    },
    onError: (error: unknown) => {
      let message = "Something went wrong!";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast({
        description: message,
      });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpInput) => authService.register(data),
    onSuccess: (data) => {
      if (data?.success) {
        navigate("/login");
        toast({
          description: data?.message || "Registration successful!",
        });
      } else {
        toast({
          description: data?.message || "Failed to register.",
        });
      }
    },
    onError: (error: unknown) => {
      let message = "Something went wrong!";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast({
        description: message,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (data) => {
      if (data?.success) {
        dispatch(addUser(null));
        navigate("/login");
        toast({
          description: data?.message || "Logged out successfully!",
        });
      } else {
        toast({
          description: data?.message || "Failed to logout.",
        });
      }
    },
    onError: (error: unknown) => {
      let message = "Something went wrong!";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast({
        description: message,
      });
    },
  });

  return {
    user,
    login: loginMutation.mutate,
    signUp: signUpMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
};
