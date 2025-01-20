import { Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MagicCard } from "../ui/magic-card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

interface JobProps {
  job: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    position: string;
    jobType: string;
    salary: string;
    company: {
      name: string;
      logo: string;
    };
  };
}

function Job({ job }: JobProps) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime: string) => {
    try {
      const createdAt = new Date(mongodbTime);

      if (isNaN(createdAt.getTime())) {
        console.error("Invalid date format:", mongodbTime);
        return 0;
      }

      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - createdAt.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      return daysDifference;
    } catch (error) {
      console.error("Error calculating days difference:", error);
      return 0;
    }
  };

  const getCompanyInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <div className="flex h-auto min-h-[250px] flex-col gap-2">
      <MagicCard
        className="cursor-pointer flex-col my-1 px-5 py-4 shadow-2xl"
        gradientColor="#D9D9D955"
      >
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
          >
            <Bookmark />
          </Button>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Button
            className="p-6"
            variant="outline"
            size="icon"
          >
            <Avatar>
              <AvatarImage
                src={job?.company?.logo}
                alt={`${job?.company?.name} logo`}
              />
              <AvatarFallback>
                {getCompanyInitials(job?.company?.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
          <div>
            <h1 className="text-lg font-medium">{job.company.name}</h1>
            <p className="text-sm text-gray-600">India</p>
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
          <p className="text-xl mb-2">{job?.title}</p>
          <p className="text-sm text-gray-700 whitespace-normal">
            {job?.description}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Badge className="bg-red-500">{job?.position} Positions</Badge>
            <Badge className="bg-pink-700">{job.jobType}</Badge>
            <Badge className="bg-blue-400">{job?.salary} lpa</Badge>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button
              onClick={() => navigate(`/detail/${job?._id}`)}
              variant="outline"
              className="font-bold rounded-md"
            >
              Details
            </Button>
            <Button
              variant="outline"
              className="bg-red-600 hover:bg-red-400 hover:text-white text-white font-bold rounded-md"
            >
              Save For Later
            </Button>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}

export default Job;
