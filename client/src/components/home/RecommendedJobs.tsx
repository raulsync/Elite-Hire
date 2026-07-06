import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Sparkles, TrendingUp } from "lucide-react";
import { MagicCard } from "../ui/magic-card";
import type { RecommendedJob } from "@/types";

function RecommendedJobs() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [recommendations, setRecommendations] = useState<RecommendedJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role === "Recruiter") return;

    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get("/analytics/recommendations");
        if (res.data.success) {
          setRecommendations(res.data.data);
        }
      } catch {
        //
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (!user || user.role === "Recruiter") return null;
  if (isLoading) return null;
  if (recommendations.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto my-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-br from-primary/20 to-violet-500/20 rounded-xl">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">
            Recommended for You
          </h2>
          <p className="text-sm text-zinc-500">
            Jobs matching your skill profile
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendations.slice(0, 6).map((job) => (
          <div
            key={job._id}
            onClick={() => navigate(`/detail/${job._id}`)}
            className="flex h-auto min-h-[250px] flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl"
          >
            <MagicCard
              className="cursor-pointer flex-col my-2 px-6 py-4 border border-zinc-200/50 shadow-sm h-full"
              gradientColor="#6366f115"
            >
              <div className="flex flex-col w-full justify-between flex-1">
                <div>
                  {/* Match Score Badge */}
                  {job.matchScore > 0 && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          job.matchScore >= 70
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : job.matchScore >= 40
                              ? "bg-amber-100 text-amber-700 border border-amber-200"
                              : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                        }`}
                      >
                        <TrendingUp className="h-3 w-3" />
                        {job.matchScore}% Match
                      </div>
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-zinc-900 mb-1">
                    {job.company?.name || "Company"}
                  </h2>
                  <p className="text-zinc-400 text-sm mb-3">{job.location}</p>
                  <p className="text-lg font-semibold text-zinc-850 mb-2">
                    {job.title}
                  </p>
                  <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                    {job.description}
                  </p>

                  {/* Matched Skills */}
                  {job.matchedSkills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {job.matchedSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-auto">
                  <Badge
                    className="bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-none font-medium px-2.5 py-0.5"
                    variant="outline"
                  >
                    {job.jobType}
                  </Badge>
                  <Badge
                    className="bg-violet-50 text-violet-700 border border-violet-100 shadow-none font-medium px-2.5 py-0.5"
                    variant="outline"
                  >
                    {job.salary} LPA
                  </Badge>
                  {job.experience !== undefined && (
                    <Badge
                      className="bg-zinc-100 text-zinc-700 border border-zinc-200 shadow-none font-medium px-2.5 py-0.5"
                      variant="outline"
                    >
                      {job.experience} Years
                    </Badge>
                  )}
                </div>
              </div>
            </MagicCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedJobs;
