import { setAllAppliedJobs } from "@/store/features/jobSlice";
import { APPLICATION_API } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "./use-toast";

export const useGetAppliedJob = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const fetchAppliedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(APPLICATION_API + "/get", {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setAllAppliedJobs(response.data.data));
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
          description: "Unexpected error occured",
        });
      }
    }
  };
  useEffect(() => {
    fetchAppliedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading };
};
