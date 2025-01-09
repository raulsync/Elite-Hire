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

function AppliedJobs() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl">
      <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
      {/* Add Application Table */}
      {/* <AppliedJob /> */}
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
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TableRow key={index}>
                <TableCell>23-12-2024</TableCell>
                <TableCell>Software Engineer</TableCell>
                <TableCell>Microsoft</TableCell>
                <TableCell className="text-right">
                  <Badge> Selected</Badge>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJobs;
