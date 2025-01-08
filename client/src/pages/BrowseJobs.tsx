import Job from "@/components/jobs/Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function BrowseJobs() {
  return (
    <div className="max-w-7xl mx-auto my-5 flex flex-col">
      <h1 className="font-bold text-xl my-10 ">
        Search Results {jobsArray.length}
      </h1>
      {
        <div className="grid grid-cols-3 gap-5 my-1">
          {jobsArray.map((job, index) => (
            <Job />
          ))}
        </div>
        // <JobCard />
      }
    </div>
  );
}

export default BrowseJobs;
