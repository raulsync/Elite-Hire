import Job from "@/components/jobs/Job";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function BrowseJobs() {
  const { jobs } = useSelector((state: RootState) => state.job);
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
