import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { MagicCard } from "../ui/magic-card";

import { Job } from "@/store/features/jobSlice";

interface JobProps {
  job: Job;
}
function JobCard({ job }: JobProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`detail/${job._id}`)}
      className="flex h-auto min-h-[250px] flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl"
    >
      <MagicCard
        className="cursor-pointer flex-col my-2 px-6 py-4 border border-zinc-200/50 shadow-sm h-full"
        gradientColor="#6366f115"
      >
        <div className="flex flex-col w-full justify-between flex-1">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-1">{job.company.name}</h2>
            <p className="text-zinc-400 text-sm mb-3">India</p>
            <p className="text-lg font-semibold text-zinc-850 mb-2">{job.title}</p>
            <p className="text-sm text-zinc-500 line-clamp-3 mb-4 whitespace-normal">
              {job.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 shadow-none font-medium px-2.5 py-0.5" variant="outline">{job?.position} Positions</Badge>
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/50 shadow-none font-medium px-2.5 py-0.5" variant="outline">{job?.jobType}</Badge>
            <Badge className="bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100/50 shadow-none font-medium px-2.5 py-0.5" variant="outline">{job?.salary} LPA</Badge>
            <Badge className="bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200/50 shadow-none font-medium px-2.5 py-0.5" variant="outline">{job.experience} Years Exp</Badge>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}

export default JobCard;
