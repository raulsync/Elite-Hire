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

function AppliedJobs() {
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
                  <TableCell className="text-right">
                    <Badge
                      className={`${
                        appliedJob?.status === "rejected"
                          ? "bg-red-400"
                          : appliedJob.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
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
