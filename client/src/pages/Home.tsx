import Categories from "@/components/home/Categories";
import Header from "@/components/home/Header";
import LatestJobs from "@/components/home/LatestJobs";
import { useGetJobs } from "@/hooks/useGetJobs";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function Home() {
  useGetJobs();

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50/50 via-white to-red-50/30">
      <div className="mx-auto flex flex-col gap-16 max-w-7xl px-4 lg:px-8">
        <div className="relative mt-4">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/30 to-transparent rounded-3xl" />
          <div className="relative">
            <Header />
          </div>
        </div>

        {user && (
          <>
            <div className="relative">
              <Categories />
            </div>

            <div className="relative">
              <LatestJobs />
            </div>
          </>
        )}
        {/*
        <div className="relative">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
