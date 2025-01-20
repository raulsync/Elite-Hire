import Job from "@/components/jobs/Job";
import { useGetJobs } from "@/hooks/useGetJobs";
import { setSearchQuery } from "@/store/features/jobSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function BrowseJobs() {
  useGetJobs();
  const { jobs } = useSelector((state: RootState) => state.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-5 flex flex-col">
      <h1 className="font-bold text-xl my-10 ">Search Results {jobs.length}</h1>
      {
        <div className="grid grid-cols-3 gap-5 my-1">
          {jobs.map((job) => (
            <Job
              job={job}
              key={job._id}
            />
          ))}
        </div>
        // <JobCard />
      }
    </div>
  );
}

export default BrowseJobs;
