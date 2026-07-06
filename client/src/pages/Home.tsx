import Categories from "@/components/home/Categories";
import Header from "@/components/home/Header";
import LatestJobs from "@/components/home/LatestJobs";
import RecommendedJobs from "@/components/home/RecommendedJobs";
import { useGetJobs } from "@/hooks/useGetJobs";
function Home() {
  useGetJobs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-primary/5">
      <div className="mx-auto flex flex-col gap-16 max-w-7xl px-4 lg:px-8">
        <div className="relative mt-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl" />
          <div className="relative">
            <Header />
          </div>
        </div>

        <div className="relative">
          <Categories />
        </div>

        <div className="relative">
          <RecommendedJobs />
        </div>

        <div className="relative">
          <LatestJobs />
        </div>
        {/*
        <div className="relative">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

export default Home;

