import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { APPLICATION_API, JOB_API } from "@/utils/api";
import { useParams } from "react-router-dom";
import { addOneJob } from "@/store/features/jobSlice";

interface Application {
  applicant: string;
}

function Detail() {
  const { oneJob } = useSelector((state: RootState) => state.job);
  const { user } = useSelector((state: RootState) => state.auth);
  const isIntiallyApplied =
    oneJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleApplyJob = async () => {
    try {
      const response = await axios.get(`${APPLICATION_API}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...oneJob,
          applications: [
            ...oneJob!.applications,
            { applicant: user?._id || "" },
          ],
        };
        dispatch(addOneJob(updatedSingleJob));
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
          description: "Unexpected error occurred",
        });
      }
    }
  };

  const fetchjob = useCallback(async () => {
    try {
      const response = await axios.get(`${JOB_API}/get/${jobId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(addOneJob(response.data.job));
        setIsApplied(
          response.data.job.applications.some(
            (application: Application) => application.applicant === user?._id
          )
        );
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
          description: "Unexpected error occurred",
        });
      }
    }
  }, [dispatch, jobId, toast, user?._id]);

  useEffect(() => {
    fetchjob();
  }, [fetchjob]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{oneJob?.title || "Job Title"}</h1>
          <div className="flex gap-2 items-center mt-4">
            <Badge
              className="text-blue-600 font-bold"
              variant="outline"
            >
              {oneJob?.position || "N/A"} Position
            </Badge>
            <Badge
              className="text-[#FA4F09] font-bold"
              variant="outline"
            >
              {oneJob?.salary || "N/A"} LPA
            </Badge>
            <Badge
              className="text-[#6B3AC2] font-bold"
              variant="outline"
            >
              {oneJob?.location || "Location"}
            </Badge>
            <Badge
              className="text-black font-bold"
              variant="outline"
            >
              {oneJob?.jobType || "Job Type"}
            </Badge>
          </div>
        </div>
        <div>
          <Button
            disabled={isApplied}
            onClick={isApplied ? () => {} : handleApplyJob}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#6B3AC2] hover:bg-[#552d9b]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1 ">
          Role:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            Software Engineer
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Location:{" "}
          <span className=" pl-4 font-normal text-gray-800">Remote</span>
        </h1>
        <h1 className="font-bold my-1 ">
          Salary:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            $50,000 - $80,000
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Experience:{" "}
          <span className=" pl-4 font-normal text-gray-800">3 years</span>
        </h1>
        <h1 className="font-bold my-1 ">
          Job Type:
          <span className=" pl-4 font-normal text-gray-800"> Full Time</span>
        </h1>
        <h1 className="font-bold my-1 ">
          Total Applicants:
          <span className=" pl-4 font-normal text-gray-800">10</span>
        </h1>
      </div>
    </div>
  );
}

export default Detail;
