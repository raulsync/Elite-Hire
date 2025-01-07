import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const categories: string[] = [
  "Frontend Engineer",
  "Backend Engineer",
  "Data Analyst",
  "FullStack Engineer",
  "Software Engineer",
  "Machine Learning",
  "Data Science",
  "Graphic Designer",
  "UX/UI",
];

function Categories() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div>
        <h1 className="text-2xl mb-2 font-bold text-center text-red-600">
          Categories
        </h1>
        <p className="text-center text-gray-600">
          Explore our extensive job market.
        </p>
      </div>
      <Carousel className="w-full   max-w-xl  mx-auto my-10">
        <CarouselContent>
          {categories.map((category) => {
            return (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
                <Button
                  variant={"secondary"}
                  className="rounded-full border border-red-600"
                >
                  {category}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="bg-red-400 text-white hover:bg-red-200" />
        <CarouselNext className="bg-red-400 text-white hover:bg-red-200" />
      </Carousel>
    </div>
  );
}

export default Categories;
