import { JOB_API } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./use-toast";
import { addJobs } from "@/store/features/jobSlice";
import { RootState } from "@/store/store";

export const useGetJobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.job);
  const { toast } = useToast();

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${JOB_API}/get?query=${searchQuery}`, {
        withCredentials: true,
      });
      console.log("Job Response => ", response.data.data);
      if (response?.data?.success) {
        dispatch(addJobs(response?.data?.data));
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
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};
