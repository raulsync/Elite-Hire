import { Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MagicCard } from "../ui/magic-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
    <div className="flex h-auto flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl">
      <MagicCard
        className="cursor-pointer flex-col my-1 px-5 py-4 border border-zinc-200/50 shadow-sm rounded-xl"
        gradientColor="#6366f115"
      >
        <div className="flex justify-between items-center">
          <p className="text-xs font-medium text-zinc-400">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <Button
            variant="outline"
            className="rounded-full h-8 w-8 text-zinc-400 hover:text-primary hover:bg-primary/10 border-zinc-200"
            size="icon"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3 my-3">
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200/60 overflow-hidden p-2 flex-shrink-0">
            <Avatar className="h-full w-full object-contain">
              <AvatarImage
                src={job?.company?.logo}
                alt={`${job?.company?.name} logo`}
              />
              <AvatarFallback className="text-zinc-600 font-semibold text-xs">
                {getCompanyInitials(job?.company?.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-900">{job.company.name}</h1>
            <p className="text-xs text-zinc-400">India</p>
          </div>
        </div>
        <div className="flex flex-col w-full justify-between flex-1">
          <div>
            <p className="text-lg font-bold text-zinc-800 mb-1.5">{job?.title}</p>
            <p className="text-sm text-zinc-550 whitespace-normal line-clamp-2 mb-4 leading-relaxed">
              {job?.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 shadow-none font-medium px-2.5 py-0.5" variant="outline">{job?.position} Positions</Badge>
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/50 shadow-none font-medium px-2.5 py-0.5" variant="outline">{job.jobType}</Badge>
            <Badge className="bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100/50 shadow-none font-medium px-2.5 py-0.5" variant="outline">{job?.salary} LPA</Badge>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Button
              onClick={() => navigate(`/detail/${job?._id}`)}
              className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 h-9 text-sm font-semibold shadow-none transition-colors"
            >
              Details
            </Button>
            <Button
              variant="outline"
              className="border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg px-4 h-9 text-sm font-semibold transition-colors"
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
