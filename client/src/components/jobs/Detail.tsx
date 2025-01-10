import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
function Detail() {
  const isApplied = true;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">Title</h1>
          <div className=" flex gap-2 items-center mt-4 ">
            <Badge
              className={" text-blue-600 font-bold"}
              variant="outline"
            >
              10 Position
            </Badge>
            <Badge
              className={" text-[#FA4F09] font-bold"}
              variant="outline"
            >
              20 LPA
            </Badge>
            <Badge
              className={" text-[#6B3AC2]  font-bold"}
              variant="outline"
            >
              Remote
            </Badge>
            <Badge
              className={" text-black font-bold"}
              variant="outline"
            >
              Full Time
            </Badge>
          </div>
        </div>
        <div>
          <Button
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#6B3AC2] hover:bg-[#552d9b]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1 ">
          Role:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            Software Engineer
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Location:{" "}
          <span className=" pl-4 font-normal text-gray-800">Remote</span>
        </h1>
        <h1 className="font-bold my-1 ">
          Salary:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            $50,000 - $80,000
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Experience:{" "}
          <span className=" pl-4 font-normal text-gray-800">3 years</span>
        </h1>
        <h1 className="font-bold my-1 ">
          Job Type:
          <span className=" pl-4 font-normal text-gray-800"> Full Time</span>
        </h1>
        <h1 className="font-bold my-1 ">
          Total Applicants:
          <span className=" pl-4 font-normal text-gray-800">10</span>
        </h1>
      </div>
    </div>
  );
}

export default Detail;
