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
          ...oneJob!,
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
    <div className="min-h-screen bg-zinc-50/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div>
            <h1 className="font-bold text-2xl text-zinc-900">{oneJob?.title || "Job Title"}</h1>
            <div className="flex flex-wrap gap-2 items-center mt-3">
              <Badge
                className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 shadow-none font-medium px-2.5 py-0.5"
                variant="outline"
              >
                {oneJob?.position || "N/A"} Positions
              </Badge>
              <Badge
                className="bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100/50 shadow-none font-medium px-2.5 py-0.5"
                variant="outline"
              >
                {oneJob?.salary || "N/A"} LPA
              </Badge>
              <Badge
                className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/50 shadow-none font-medium px-2.5 py-0.5"
                variant="outline"
              >
                {oneJob?.location || "Location"}
              </Badge>
              <Badge
                className="bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200/50 shadow-none font-medium px-2.5 py-0.5"
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
              className={`rounded-lg px-6 h-10 text-sm font-semibold transition-all ${
                isApplied
                  ? "bg-zinc-100 text-zinc-400 border border-zinc-250 cursor-not-allowed shadow-none"
                  : "bg-primary hover:bg-primary/90 text-white shadow-sm"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        <h2 className="font-bold text-lg text-zinc-900 mt-8 mb-4">
          Job Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm font-medium w-32">Role:</span>
            <span className="text-zinc-800 text-sm font-semibold">{oneJob?.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm font-medium w-32">Location:</span>
            <span className="text-zinc-800 text-sm font-semibold">{oneJob?.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm font-medium w-32">Salary:</span>
            <span className="text-zinc-800 text-sm font-semibold">{oneJob?.salary} LPA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm font-medium w-32">Experience:</span>
            <span className="text-zinc-800 text-sm font-semibold">{oneJob?.experience || 0} Years</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm font-medium w-32">Job Type:</span>
            <span className="text-zinc-800 text-sm font-semibold">{oneJob?.jobType}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm font-medium w-32">Total Applicants:</span>
            <span className="inline-flex items-center justify-center bg-primary/10 text-primary border border-primary/20 text-xs font-bold rounded-full px-2.5 py-0.5">
              {oneJob?.applications?.length || 0}
            </span>
          </div>
        </div>

        <h2 className="font-bold text-lg text-zinc-900 mt-8 mb-4">
          Job Description
        </h2>
        <div className="text-zinc-600 text-sm leading-relaxed whitespace-pre-wrap">
          {oneJob?.description}
        </div>
      </div>
    </div>
  );
}

export default Detail;
