import JobCard from "./JobCard";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function LatestJobs() {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl text-center">
        <span>
          Latest and trending{" "}
          <span className="text-red-600 font-semibold">Job opening</span>
        </span>
      </h2>
      <div className="grid grid-cols-3 gap-5 my-10">
        {randomJobs.slice(0, 6).map((job, index) => (
          <JobCard />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
