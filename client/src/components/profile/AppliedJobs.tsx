import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAppliedJob } from "@/hooks/useGetAppliedJobs";

function AppliedJobs() {
  useGetAppliedJob();
  const { allAppliedJobs } = useSelector((state: RootState) => state.job);
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl">
      <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
      <div>
        <Table>
          <TableCaption>Recent Applied Jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length <= 0 ? (
              <span>You haven't applied any job yet.</span>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="text-right flex flex-col items-end gap-1.5 py-3">
                    <Badge
                      variant="outline"
                      className={`shadow-none font-medium px-2.5 py-0.5 rounded-full ${
                        appliedJob?.status.toLowerCase() === "rejected"
                          ? "bg-rose-50 text-rose-700 border border-rose-100"
                          : appliedJob.status.toLowerCase() === "pending"
                          ? "bg-zinc-100 text-zinc-650 border border-zinc-200/60"
                          : appliedJob.status.toLowerCase() === "interview"
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}
                    >
                      {appliedJob.status.toLowerCase() === "accepted"
                        ? "SHORTLISTED"
                        : appliedJob.status.toLowerCase() === "interview"
                        ? "INTERVIEWING"
                        : appliedJob.status.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-[10px] mt-0.5 font-medium">
                      {/* Step 1 */}
                      <span className="text-emerald-600 font-semibold">Applied</span>
                      <span className="h-[2px] w-2.5 bg-emerald-300" />
                      
                      {/* Step 2 */}
                      <span className={`${
                        appliedJob.status.toLowerCase() === "pending"
                          ? "text-primary font-bold animate-pulse"
                          : "text-emerald-600 font-semibold"
                      }`}>
                        Screening
                      </span>
                      <span className={`h-[2px] w-2.5 ${
                        appliedJob.status.toLowerCase() === "pending" ? "bg-zinc-200" : "bg-emerald-300"
                      }`} />
                      
                      {/* Step 3 */}
                      <span className={`${
                        appliedJob.status.toLowerCase() === "interview"
                          ? "text-blue-600 font-bold animate-pulse"
                          : appliedJob.status.toLowerCase() === "pending"
                          ? "text-zinc-405 font-medium text-zinc-400"
                          : "text-emerald-600 font-semibold"
                      }`}>
                        Interview
                      </span>
                      <span className={`h-[2px] w-2.5 ${
                        appliedJob.status.toLowerCase() === "pending" || appliedJob.status.toLowerCase() === "interview"
                          ? "bg-zinc-200"
                          : "bg-emerald-300"
                      }`} />
                      
                      {/* Step 4 */}
                      <span className={`${
                        appliedJob.status.toLowerCase() === "pending" || appliedJob.status.toLowerCase() === "interview"
                          ? "text-zinc-400"
                          : appliedJob.status.toLowerCase() === "rejected"
                          ? "text-rose-600 font-bold"
                          : "text-emerald-600 font-bold"
                      }`}>
                        {appliedJob.status.toLowerCase() === "rejected"
                          ? "Rejected"
                          : appliedJob.status.toLowerCase() === "accepted"
                          ? "Shortlisted"
                          : "Result"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJobs;
