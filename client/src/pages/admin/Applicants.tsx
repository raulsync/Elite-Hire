import ApplicantsTable from "@/components/admin/ApplicantsTable";
import Applicant from "@/components/admin/Applicant";
import { useEffect } from "react";
import { addApplicants } from "@/store/features/applicationSlice";
import { APPLICATION_API } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state: RootState) => state.application);

  const handleStatus = async (status: string, id: string) => {
    try {
      console.log("Status Update Called");

      const response = await axios.put(
        `${APPLICATION_API}/status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
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

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_API}/${params.id}/applicants`,
        { withCredentials: true }
      );
      dispatch(addApplicants(response.data.data));
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
    fetchApplicants();
  }, []);
  return (
    <div className="mx-auto flex flex-col gap-2 max-w-7xl mt-10">
      <Applicant applicants={applicants} />
      <ApplicantsTable
        applicants={applicants}
        handleStatus={handleStatus}
      />
    </div>
  );
}

export default Applicants;
