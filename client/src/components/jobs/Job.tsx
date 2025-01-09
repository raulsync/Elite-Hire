import { Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MagicCard } from "../ui/magic-card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

function Job({
  company = "Company Name",
  location = "India",
  title = "Job title",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam magni et cumque molestias hic optio ad fuga iste corporis ex.",
}) {
  const navigate = useNavigate();
  const _id = "12";
  return (
    <div className="flex h-auto min-h-[250px] flex-col gap-2">
      <MagicCard
        className="cursor-pointer flex-col my-1 px-5 py-4 shadow-2xl h-full"
        gradientColor="#D9D9D955"
      >
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">3 days ago</p>
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            // onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {/* {isBookmarked ? <BookMarked /> : <Bookmark />} */}
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
                src="https://yt3.googleusercontent.com/Kbk6fvLQH3X7q6zGb7I-TLDH_2FFA6WZXoKZty5kjlm7nqHxUcQVgv420shK0Z_qN4sp841RVcY=s900-c-k-c0x00ffffff-no-rj"
                alt="Company Logo"
              />
            </Avatar>
          </Button>
          <div>
            <h1 className="text-lg font-medium">{company}</h1>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
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
          <div className="flex items-center gap-4 mt-4">
            <Button
              onClick={() => navigate(`/detail/${_id}`)}
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
