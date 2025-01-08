import FilterCards from "@/components/jobs/FilterCards";
import Job from "../components/jobs/Job";
// import JobCard from "@/components/home/JobCard";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function Jobs() {
  return (
    <div className="max-w-7xl mx-auto my-10 flex justify-between gap-10">
      <div className="w-20% ">
        <FilterCards />
      </div>

      {
        <div className="grid grid-cols-3 gap-5 my-10">
          {jobsArray.map((job, index) => (
            <Job />
          ))}
        </div>
        // <JobCard />
      }
    </div>
  );
}

export default Jobs;
