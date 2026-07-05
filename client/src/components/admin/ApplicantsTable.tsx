import { useState } from "react";
import {
  Brain,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
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
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  PopulatedJob,
  PopulatedApplication,
} from "@/store/features/applicationSlice";
import { generateAIMatchReport, AIMatchReport } from "@/utils/aiParser";

interface ApplicantsTableProps {
  applicants: PopulatedJob | null;
  handleStatus: (status: string, id: string) => void;
}

function ApplicantsTable({ applicants, handleStatus }: ApplicantsTableProps) {
  const [selectedReport, setSelectedReport] = useState<AIMatchReport | null>(null);
  const [selectedCandidateName, setSelectedCandidateName] = useState<string>("");
  const [isReportOpen, setIsReportOpen] = useState(false);

  const openMatchReport = (
    applicantName: string,
    skills: string[] | undefined,
    jobTitle: string,
    requirements: string[]
  ) => {
    const report = generateAIMatchReport(
      applicantName,
      skills || [],
      jobTitle,
      requirements || []
    );
    setSelectedReport(report);
    setSelectedCandidateName(applicantName);
    setIsReportOpen(true);
  };

  return (
    <div className="bg-white border border-zinc-200/60 rounded-xl shadow-sm overflow-hidden mt-6">
      <Table>
        <TableCaption className="pb-4">
          A list of recent applicants and their AI match assessments.
        </TableCaption>
        <TableHeader className="bg-zinc-50/70 border-b border-zinc-200/50">
          <TableRow>
            <TableHead className="font-semibold text-zinc-700">Candidate Name</TableHead>
            <TableHead className="font-semibold text-zinc-700">Email Address</TableHead>
            <TableHead className="font-semibold text-zinc-700">Contact</TableHead>
            <TableHead className="font-semibold text-zinc-700 font-mono text-center">AI Match Score</TableHead>
            <TableHead className="font-semibold text-zinc-700">Resume Link</TableHead>
            <TableHead className="font-semibold text-zinc-700 text-right">Application Pipeline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants && applicants.applications && applicants.applications.length > 0 ? (
            applicants.applications.map((item: PopulatedApplication) => {
              // Pre-calculate score for badge color
              const report = generateAIMatchReport(
                item?.applicant?.name || "Candidate",
                item?.applicant?.profile?.skills || [],
                applicants.title || "Job Role",
                applicants.requirements || []
              );

              let badgeColor = "";
              if (report.score >= 83) {
                badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/50";
              } else if (report.score >= 68) {
                badgeColor = "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100/50";
              } else {
                badgeColor = "bg-rose-50 text-rose-700 border-rose-200/60 hover:bg-rose-100/50";
              }

              return (
                <TableRow key={item._id} className="hover:bg-zinc-50/30 transition-colors">
                  <TableCell className="font-semibold text-zinc-900">
                    {item?.applicant?.name}
                  </TableCell>
                  <TableCell className="text-zinc-550">{item?.applicant?.email}</TableCell>
                  <TableCell className="text-zinc-550">{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() =>
                        openMatchReport(
                          item?.applicant?.name || "Candidate",
                          item?.applicant?.profile?.skills,
                          applicants.title,
                          applicants.requirements
                        )
                      }
                      className="inline-flex"
                    >
                      <Badge
                        variant="outline"
                        className={`cursor-pointer transition-all duration-200 hover:scale-[1.03] shadow-none flex items-center gap-1.5 px-3 py-1 font-semibold rounded-full ${badgeColor}`}
                      >
                        <Brain className="h-3.5 w-3.5" />
                        {report.score}% Match
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resumeUrl ? (
                      <a
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium underline transition-colors"
                        href={item?.applicant?.profile?.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        <span>View Resume</span>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    ) : (
                      <span className="text-zinc-400">Not Uploaded</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-block min-w-[130px] text-left">
                      <Select
                        defaultValue={item.status}
                        onValueChange={(val) => handleStatus(val, item?._id)}
                      >
                        <SelectTrigger className="h-9 border-zinc-200 shadow-none focus:ring-primary rounded-lg text-xs font-semibold">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg shadow-md border-zinc-200">
                          <SelectItem value="pending" className="text-zinc-600 font-medium text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-zinc-400" /> Pending
                            </span>
                          </SelectItem>
                          <SelectItem value="accepted" className="text-emerald-700 font-semibold text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Shortlisted
                            </span>
                          </SelectItem>
                          <SelectItem value="rejected" className="text-rose-700 font-semibold text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-rose-500" /> Rejected
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-zinc-400">
                No applications submitted for this role yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* AI Resume Match Report Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-2xl rounded-2xl border-zinc-250 p-6">
          <DialogHeader>
            <div className="flex items-center gap-2 text-primary mb-1">
              <Sparkles className="h-5 w-5 fill-primary/10" />
              <span className="text-xs font-bold uppercase tracking-wider">
                AI Talent Assessment
              </span>
            </div>
            <DialogTitle className="text-xl font-bold text-zinc-900">
              Match Report for {selectedCandidateName}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Algorithmic alignment score generated based on resume experience vs {applicants?.title} requirements.
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="mt-4 space-y-6">
              {/* Score summary panel */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-gradient-to-r from-primary/5 to-zinc-50 border border-primary/15 rounded-xl">
                <div className="flex items-center justify-center h-20 w-20 rounded-full border-4 border-primary/20 bg-white shadow-inner flex-shrink-0">
                  <span className="text-2xl font-extrabold text-primary">
                    {selectedReport.score}%
                  </span>
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                    <Brain className="h-3 w-3" />
                    Verified Fit Rate
                  </div>
                  <p className="text-zinc-650 text-sm leading-relaxed">
                    {selectedReport.feedback}
                  </p>
                </div>
              </div>

              {/* Match Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Strengths */}
                <div className="space-y-3 bg-emerald-50/20 border border-emerald-500/10 p-4 rounded-xl">
                  <h4 className="font-bold text-sm text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    {selectedReport.strengths.map((strength, idx) => (
                      <li key={idx} className="text-xs text-zinc-650 flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="space-y-3 bg-blue-50/20 border border-blue-500/10 p-4 rounded-xl">
                  <h4 className="font-bold text-sm text-blue-800 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 text-blue-600" /> Interview Notes
                  </h4>
                  <ul className="space-y-2">
                    {selectedReport.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-xs text-zinc-650 flex items-start gap-1.5">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills breakdown */}
              <div className="space-y-4 pt-2 border-t border-zinc-100">
                <div>
                  <h5 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wide">
                    Matched Skillsets
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReport.matchedSkills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        className="bg-emerald-50 text-emerald-700 border-emerald-100 font-medium px-2 py-0.5 text-[10px] shadow-none"
                        variant="outline"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wide">
                    Missing / Desired Skills
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReport.missingSkills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        className="bg-rose-50 text-rose-700 border-rose-100 font-medium px-2 py-0.5 text-[10px] shadow-none"
                        variant="outline"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-zinc-100">
            <Button
              onClick={() => setIsReportOpen(false)}
              className="bg-primary hover:bg-primary/90 text-white rounded-lg h-9 text-xs px-4"
            >
              Done Reviewing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApplicantsTable;
