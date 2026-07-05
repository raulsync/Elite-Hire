import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import { RootState } from "@/store/store";

function LatestJobs() {
  const jobs = useSelector((state: RootState) => state.job?.jobs || []);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold text-center text-zinc-900">
        <span>
          Latest and trending{" "}
          <span className="text-primary">Job Openings</span>
        </span>
      </h2>
      <div className="grid grid-cols-3 gap-5 my-10">
        {jobs.length === 0 ? (
          <span>No Job Available</span>
        ) : (
          jobs.slice(0, 6).map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
