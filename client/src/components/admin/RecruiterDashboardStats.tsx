import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Building2, Briefcase, Users } from "lucide-react";
import { useGetCompanies } from "@/hooks/useGetCompanies";
import { useGetAdminJobs } from "@/hooks/useGetAdminJobs";

function RecruiterDashboardStats() {
  useGetCompanies();
  useGetAdminJobs();

  const { companies } = useSelector((state: RootState) => state.company);
  const { adminJobs } = useSelector((state: RootState) => state.job);

  const totalApplicants = adminJobs.reduce(
    (acc, job) => acc + (job.applications?.length || 0),
    0,
  );

  const stats = [
    {
      title: "Active Companies",
      value: companies.length,
      icon: Building2,
      description: "Registered organizations",
      borderTheme: "border-[#0EA5E9]/30",
      bgTheme: "bg-sky-50/50",
      iconColor: "text-[#0EA5E9]",
    },
    {
      title: "Active Positions",
      value: adminJobs.length,
      icon: Briefcase,
      description: "Live job openings",
      borderTheme: "border-primary/20",
      bgTheme: "bg-primary/5",
      iconColor: "text-primary",
    },
    {
      title: "Total Candidates",
      value: totalApplicants,
      icon: Users,
      description: "Applications received",
      borderTheme: "border-emerald-500/20",
      bgTheme: "bg-emerald-50/40",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className={`flex flex-col p-6 bg-white border ${stat.borderTheme} rounded-2xl shadow-sm hover:shadow-md transition-all duration-350 transform hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-400">
                {stat.title}
              </span>
              <div
                className={`p-2.5 rounded-xl ${stat.bgTheme} ${stat.iconColor}`}
              >
                <IconComponent className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs text-zinc-400 font-medium mt-1">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecruiterDashboardStats;
