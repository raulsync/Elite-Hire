import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import LatestJobs from "@/components/home/LatestJobs";

function Home() {
  return (
    <div className="mx-auto flex flex-col gap-2 max-w-7xl mt-10">
      <Header />
      <Categories />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
