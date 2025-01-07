import { Badge } from "../ui/badge";
import { MagicCard } from "../ui/magic-card";

function JobCard({
  company = "Company Name",
  location = "India",
  title = "Job title",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam magni et cumque molestias hic optio ad fuga iste corporis ex.",
}) {
  return (
    <div className="flex h-auto min-h-[250px] flex-col gap-2">
      <MagicCard
        className="cursor-pointer flex-col my-2 px-6 py-4 shadow-2xl h-full"
        gradientColor="#D9D9D955"
      >
        <div className="flex flex-col w-full h-full">
          <h2 className="text-2xl font-semibold mb-2">{company}</h2>
          <p className="text-gray-600 text-lg mb-1">{location}</p>
          <p className="text-xl mb-2">{title}</p>
          <p className="text-sm text-gray-700 whitespace-normal">
            {description}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Badge className="bg-red-500">10 position</Badge>
            <Badge className="bg-blue-400">20 lpa</Badge>
            <Badge className="bg-pink-700">remote</Badge>
            <Badge className="bg-zinc-700">fulltime</Badge>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}

export default JobCard;
