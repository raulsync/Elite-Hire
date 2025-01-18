import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "./use-toast";
import axios from "axios";
import { JOB_API } from "@/utils/api";
import { setAdminJobs } from "@/store/features/jobSlice";

export const useGetAdminJobs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const fetchAdminJobs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${JOB_API}/getadminjobs`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setAdminJobs(response.data.data));
      }
    } catch (error) {
      console.error("API Error:", error);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};
