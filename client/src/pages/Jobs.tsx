import FilterCards from "@/components/jobs/FilterCards";
import Job from "../components/jobs/Job";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

function Jobs() {
  const { jobs, searchQuery } = useSelector((state: RootState) => state.job);
  const [filterJobs, setFilterJobs] = useState<typeof jobs>([]);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = jobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(jobs);
    }
  }, [jobs, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto my-10 flex justify-between gap-10">
      <div className="w-20%">
        <FilterCards />
      </div>
      <div className="grid grid-cols-3 gap-5 items-start">
        {filterJobs.map((job) => (
          <Job
            key={job._id}
            job={job}
          />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
