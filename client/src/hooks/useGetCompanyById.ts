import axios from "axios";
import { useToast } from "./use-toast";
import { COMPANY_API } from "@/utils/api";
import { useDispatch } from "react-redux";
import { addCompany } from "@/store/features/companySlice";
import { useEffect } from "react";

export const useGetCompanyById = (companyId: string | undefined) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const fetchCompanyById = async () => {
    try {
      const response = await axios.get(`${COMPANY_API}/get/${companyId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(addCompany(response?.data?.company));
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
    fetchCompanyById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, dispatch]);
};
