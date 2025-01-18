import axios from "axios";
import { useToast } from "./use-toast";
import { COMPANY_API } from "@/utils/api";
import { useDispatch } from "react-redux";
import { addCompanies } from "@/store/features/companySlice";
import { useEffect } from "react";

export const useGetCompanies = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${COMPANY_API}/get`, {
        withCredentials: true,
      });

      if (response.data) {
        dispatch(addCompanies(response.data.company));
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

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
