import FilterCards from "@/components/jobs/FilterCards";
import Job from "../components/jobs/Job";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

function Jobs() {
  const { jobs, searchQuery } = useSelector((state: RootState) => state.job);
  const [filterJobs, setFilterJobs] = useState<typeof jobs>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(() => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    if (selectedFilter) {
      filtered = filtered.filter((job) => {
        const query = selectedFilter.toLowerCase();
        return (
          job.location.toLowerCase().includes(query) ||
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.salary.toLowerCase().includes(query) ||
          (job.experience !== undefined && `${job.experience}`.includes(query))
        );
      });
    }

    setFilterJobs(filtered);
  }, [jobs, searchQuery, selectedFilter]);

  return (
    <div className="min-h-screen bg-zinc-50/30 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4 flex-shrink-0">
        <FilterCards selectedValue={selectedFilter} onChange={setSelectedFilter} />
      </div>
      <div className="flex-1">
        {filterJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-zinc-200/50 text-center">
            <p className="text-zinc-500 font-medium">No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filterJobs.map((job) => (
              <Job
                key={job._id}
                job={job}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
