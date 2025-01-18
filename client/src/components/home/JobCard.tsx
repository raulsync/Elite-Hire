import { Badge } from "../ui/badge";
import { MagicCard } from "../ui/magic-card";

interface JobProps {
  job: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    position: string;
    jobType: string;
    salary: string;
    experience?: string;
    company: {
      name: string;
      logo: string;
    };
  };
}
function JobCard({ job }: JobProps) {
  return (
    <div className="flex h-auto min-h-[250px] flex-col gap-2">
      <MagicCard
        className="cursor-pointer flex-col my-2 px-6 py-4 shadow-2xl h-full"
        gradientColor="#D9D9D955"
      >
        <div className="flex flex-col w-full h-full">
          <h2 className="text-2xl font-semibold mb-2">{job.company.name}</h2>
          <p className="text-gray-600 text-lg mb-1">India</p>
          <p className="text-xl mb-2">{job.title}</p>
          <p className="text-sm text-gray-700 whitespace-normal">
            {job.description}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Badge className="bg-red-500">{job?.position}</Badge>
            <Badge className="bg-blue-400">{job?.jobType}</Badge>
            <Badge className="bg-pink-700">{job?.salary}</Badge>
            <Badge className="bg-zinc-700">{job.experience} year</Badge>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}

export default JobCard;
