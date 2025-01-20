import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { BriefcaseIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/store/features/jobSlice";

const categories: Array<{
  name: string;
  count: number;
}> = [
  { name: "Frontend Engineer", count: 245 },
  { name: "Backend Engineer", count: 189 },
  { name: "Data Analyst", count: 167 },
  { name: "FullStack Engineer", count: 203 },
  { name: "Software Engineer", count: 312 },
  { name: "Machine Learning", count: 145 },
  { name: "Data Science", count: 178 },
  { name: "Graphic Designer", count: 156 },
  { name: "UX/UI", count: 198 },
];

function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJob = (query: string) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-red-600 bg-red-50 border border-red-100 font-medium text-sm">
            <BriefcaseIcon className="w-4 h-4 mr-2" />
            Explore Categories
          </span>

          <h2 className="text-3xl font-bold tracking-tight">
            Browse by <span className="text-red-600">Job Categories</span>
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our extensive job market and find the perfect role that
            matches your expertise and career aspirations.
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto mt-12">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                  <Button
                    onClick={() => handleJob(category.name)}
                    variant="secondary"
                    className="relative w-full rounded-full border border-red-100 bg-white hover:border-red-200 hover:bg-red-50 transition-all duration-300"
                  >
                    <span className="mr-2">{category.name}</span>
                    <span className="inline-flex items-center justify-center bg-red-100 text-red-600 text-xs rounded-full px-2 py-0.5 min-w-[2rem]">
                      {category.count}
                    </span>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 -left-12" />
          <CarouselNext className="bg-white border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 -right-12" />
        </Carousel>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            className="rounded-full border-2 border-red-500 hover:bg-red-50 text-red-600 px-8"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Categories;
