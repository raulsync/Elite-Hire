import Jobs from "@/components/admin/Jobs";
import JobsTable from "@/components/admin/JobsTable";
import RecruiterDashboardStats from "@/components/admin/RecruiterDashboardStats";
import { useGetAdminJobs } from "@/hooks/useGetAdminJobs";
import { setSearchJob } from "@/store/features/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobs() {
  useGetAdminJobs();
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJob(input));
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <RecruiterDashboardStats />
      <Jobs
        setInput={setInput}
        navigate={navigate}
      />
      <JobsTable />
    </div>
  );
}

export default AdminJobs;
