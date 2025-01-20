import { setSearchQuery } from "@/store/features/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuery = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-red-600 bg-red-50 border border-red-100 font-medium text-sm animate-fade-in">
              Get started from today
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Join our team today to take your{" "}
              <span className="md:block">
                <span className="text-red-600 inline-block animate-pulse">
                  next step
                </span>{" "}
                of your career
              </span>
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Start your hunt for the best, life-changing career opportunities
              from here in your selected areas conveniently and get hired
              quickly.
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center">
              <input
                className="w-full px-6 py-4 rounded-full shadow-lg border border-red-100 focus:border-red-300 outline-none text-gray-700 placeholder-gray-400 bg-white/90 backdrop-blur-sm transition-all duration-300"
                type="text"
                placeholder="Start searching your dream job..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={handleQuery}
                className="absolute right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="pt-8 flex justify-center gap-8 text-gray-600">
            <div className="text-center">
              <div className="font-bold text-2xl text-red-600">10k+</div>
              <div className="text-sm">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-red-600">8k+</div>
              <div className="text-sm">Companies</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-red-600">15k+</div>
              <div className="text-sm">Candidates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
