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
    <div className="min-h-screen bg-zinc-50/30 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
        Search Results{" "}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          {jobs.length} found
        </span>
      </h1>
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-zinc-200/50 text-center">
          <p className="text-zinc-500 font-medium">No search results found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Job
              job={job}
              key={job._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseJobs;
