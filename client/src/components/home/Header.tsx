import { Search, SearchIcon } from "lucide-react";

function Header() {
  return (
    <div className="w-full">
      <div className="text-center">
        <div className=" flex justify-center flex-col gap-4 my-16">
          <span className=" mx-auto bg-gray-200 rounded-full px-5 py-1 text-red-800">
            Get started from today
          </span>
          <h2 className="text-5xl font-bold my-2">
            Join our team today to take your <br />
            <span className="text-red-600">next step </span>
            of your career
          </h2>
          <p className="text-gray-700">
            Start your hunt for the best, life-changing career opportunities
            from here in your <br /> selected areas conveniently and get hired
            quickly.
          </p>
        </div>
        <div className="w-1/2 flex mx-auto relative">
          <input
            className="outline-none border border-red-600 w-full px-5 py-2 rounded-full shadow-lg"
            type="text"
            placeholder="Start Searching your Dream Job"
          />
          <button className="absolute right-4 top-2">
            <SearchIcon className="text-red-600  opacity-85" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
