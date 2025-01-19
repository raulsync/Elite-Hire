import Jobs from "@/components/admin/Jobs";
import JobsTable from "@/components/admin/JobsTable";
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
  useGetAdminJobs();

  return (
    <div className="max-w-6xl mx-auto my-10">
      <Jobs
        setInput={setInput}
        navigate={navigate}
      />
      <JobsTable />
    </div>
  );
}

export default AdminJobs;
