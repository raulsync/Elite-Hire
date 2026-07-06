import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  CalendarClock,
} from "lucide-react";
import type {
  DashboardStats,
  FunnelData,
  SkillData,
  TrendData,
} from "@/types";

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"];
const STATUS_COLORS = {
  pending: "#f59e0b",
  interview: "#6366f1",
  accepted: "#10b981",
  rejected: "#ef4444",
};

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [funnel, setFunnel] = useState<FunnelData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [statsRes, funnelRes, skillsRes, trendsRes] = await Promise.all([
          apiClient.get("/analytics/dashboard"),
          apiClient.get("/analytics/funnel"),
          apiClient.get("/analytics/skills"),
          apiClient.get("/analytics/trends"),
        ]);

        if (statsRes.data.success) setStats(statsRes.data.data);
        if (funnelRes.data.success) setFunnel(funnelRes.data.data);
        if (skillsRes.data.success) setSkills(skillsRes.data.data);
        if (trendsRes.data.success) setTrends(trendsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
          <p className="text-zinc-500 text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const pieData = stats
    ? [
        { name: "Pending", value: stats.statusBreakdown.pending },
        { name: "Interview", value: stats.statusBreakdown.interview },
        { name: "Accepted", value: stats.statusBreakdown.accepted },
        { name: "Rejected", value: stats.statusBreakdown.rejected },
      ].filter((d) => d.value > 0)
    : [];

  const pieColors = [
    STATUS_COLORS.pending,
    STATUS_COLORS.interview,
    STATUS_COLORS.accepted,
    STATUS_COLORS.rejected,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">
          Recruiter Dashboard
        </h1>
        <p className="text-zinc-500 mt-1">
          Analytics overview of your hiring pipeline
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="Total Jobs"
          value={stats?.totalJobs || 0}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Total Applications"
          value={stats?.totalApplications || 0}
          color="bg-violet-100 text-violet-700"
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          label="Accepted"
          value={stats?.statusBreakdown.accepted || 0}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          icon={<CalendarClock className="h-5 w-5" />}
          label="Interview Stage"
          value={stats?.statusBreakdown.interview || 0}
          color="bg-amber-100 text-amber-700"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Application Trends */}
        <div className="bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-zinc-800 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Application Trends (30 days)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trends}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickFormatter={(val) => {
                  const d = new Date(val);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Breakdown Pie */}
        <div className="bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-zinc-800 mb-4">
            Application Status Breakdown
          </h3>
          {pieData.length > 0 ? (
            <div className="flex items-center justify-center gap-6">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: pieColors[i] }}
                    />
                    <span className="text-sm text-zinc-600">
                      {item.name}: <span className="font-semibold">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-zinc-400 text-sm">
              No application data yet
            </div>
          )}
        </div>

        {/* Application Funnel */}
        <div className="bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-zinc-800 mb-4">
            Hiring Funnel
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={funnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="stage"
                tick={{ fontSize: 12, fill: "#3f3f46" }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {funnel.map((_entry, index) => (
                  <Cell
                    key={`funnel-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Skills */}
        <div className="bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-zinc-800 mb-4">
            Top Skills in Applicant Pool
          </h3>
          {skills.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={skills}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="skill"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-zinc-400 text-sm">
              No skill data yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white border border-zinc-200/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-zinc-900">{value}</p>
          <p className="text-sm text-zinc-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
