import { useState } from "react";
import {
  Brain,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Search,
  Mail,
  Phone,
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
import { generateAIMatchReport } from "@/utils/aiParser";

interface ApplicantsTableProps {
  applicants: PopulatedJob | null;
  handleStatus: (status: string, id: string) => void;
}

function ApplicantsTable({ applicants, handleStatus }: ApplicantsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState<PopulatedApplication | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const openMatchReport = (item: PopulatedApplication) => {
    setSelectedApplicant(item);
    setIsReportOpen(true);
  };

  const currentApplicantData = selectedApplicant
    ? applicants?.applications?.find((a) => a._id === selectedApplicant._id) || selectedApplicant
    : null;

  const activeReport = currentApplicantData
    ? currentApplicantData.aiAssessment || generateAIMatchReport(
        currentApplicantData?.applicant?.name || "Candidate",
        currentApplicantData?.applicant?.profile?.skills || [],
        applicants?.title || "Job Role",
        applicants?.requirements || []
      )
    : null;

  const filteredApplications = (applicants?.applications || []).filter((item) => {
    const nameMatch = (item?.applicant?.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "all" || item.status === statusFilter;

    const report = item.aiAssessment || generateAIMatchReport(
      item?.applicant?.name || "Candidate",
      item?.applicant?.profile?.skills || [],
      applicants?.title || "Job Role",
      applicants?.requirements || []
    );

    let scoreMatch = true;
    if (scoreFilter === "high") {
      scoreMatch = report.score >= 80;
    } else if (scoreFilter === "medium") {
      scoreMatch = report.score >= 60 && report.score < 80;
    } else if (scoreFilter === "low") {
      scoreMatch = report.score < 60;
    }

    return nameMatch && statusMatch && scoreMatch;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white border border-zinc-200/60 rounded-xl shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search candidates by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3 border border-zinc-200 rounded-lg text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary text-zinc-700 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="interview">Interviewing</option>
            <option value="accepted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            className="h-10 px-3 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary text-zinc-700 outline-none"
          >
            <option value="all">All Match Scores</option>
            <option value="high">High Fit (&gt;= 80%)</option>
            <option value="medium">Medium Fit (60-80%)</option>
            <option value="low">Low Fit (&lt; 60%)</option>
          </select>
        </div>
      </div>

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
            {filteredApplications.length > 0 ? (
              filteredApplications.map((item: PopulatedApplication) => {
                const report = item.aiAssessment || generateAIMatchReport(
                  item?.applicant?.name || "Candidate",
                  item?.applicant?.profile?.skills || [],
                  applicants?.title || "Job Role",
                  applicants?.requirements || []
                );

                let badgeColor = "";
                if (report.score >= 80) {
                  badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/50";
                } else if (report.score >= 60) {
                  badgeColor = "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100/50";
                } else {
                  badgeColor = "bg-rose-50 text-rose-700 border-rose-200/60 hover:bg-rose-100/50";
                }

                return (
                  <TableRow key={item._id} className="hover:bg-zinc-50/30 transition-colors">
                    <TableCell className="font-semibold text-zinc-900">
                      <button
                        onClick={() => openMatchReport(item)}
                        className="text-left hover:underline text-primary font-semibold"
                      >
                        {item?.applicant?.name}
                      </button>
                    </TableCell>
                    <TableCell className="text-zinc-550">{item?.applicant?.email}</TableCell>
                    <TableCell className="text-zinc-550">{item?.applicant?.phoneNumber}</TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => openMatchReport(item)}
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
                          value={item.status}
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
                            <SelectItem value="interview" className="text-blue-700 font-semibold text-xs">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-blue-500" /> Interviewing
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
                  No applicants matching the filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* AI Candidate Dashboard Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-4xl rounded-2xl border-zinc-250 p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader className="border-b border-zinc-100 pb-4 mb-4">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Sparkles className="h-5 w-5 fill-primary/10" />
              <span className="text-xs font-bold uppercase tracking-wider">
                AI Talent Assessment Dashboard
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold text-zinc-900">
              Evaluation for {currentApplicantData?.applicant?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Review candidate profile details, verified skills match, and detailed AI insights.
            </DialogDescription>
          </DialogHeader>

          {currentApplicantData && activeReport && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
              {/* Left Column: Profile & Actions (5 cols) */}
              <div className="md:col-span-5 space-y-5 border-r border-zinc-100 pr-0 md:pr-6">
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-3">
                    Contact & Professional Details
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-zinc-700 text-xs">
                      <Mail className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                      <span>{currentApplicantData.applicant?.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-zinc-700 text-xs">
                      <Phone className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                      <span>{currentApplicantData.applicant?.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                {currentApplicantData.applicant?.profile?.bio && (
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-2">
                      Bio
                    </h3>
                    <p className="text-zinc-655 text-xs leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                      {currentApplicantData.applicant.profile.bio}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-2">
                    Candidate Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {currentApplicantData.applicant?.profile?.skills &&
                    currentApplicantData.applicant.profile.skills.length > 0 ? (
                      currentApplicantData.applicant.profile.skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-none font-medium px-2 py-0.5 text-[10px] shadow-none"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-zinc-400 text-xs">No skills listed</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-2">
                    Resume Document
                  </h3>
                  {currentApplicantData.applicant?.profile?.resumeUrl ? (
                    <a
                      className="inline-flex items-center gap-2 px-3 py-2 border border-zinc-200 rounded-lg text-primary hover:bg-primary/5 text-xs font-semibold transition-all w-full"
                      href={currentApplicantData.applicant.profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="truncate">
                        {currentApplicantData.applicant.profile.resumeName || "Open Resume"}
                      </span>
                      <ExternalLink className="h-3 w-3 ml-auto opacity-70" />
                    </a>
                  ) : (
                    <div className="text-zinc-400 text-xs bg-zinc-50 p-3 rounded-lg border border-zinc-100 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Resume not uploaded</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-3">
                    Update Application Status
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={currentApplicantData.status === "interview" ? "default" : "outline"}
                      onClick={() => handleStatus("interview", currentApplicantData._id)}
                      className={`h-9 text-xs rounded-lg font-bold transition-all shadow-none ${
                        currentApplicantData.status === "interview"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-zinc-200 text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      Interview Candidate
                    </Button>
                    <Button
                      variant={currentApplicantData.status === "accepted" ? "default" : "outline"}
                      onClick={() => handleStatus("accepted", currentApplicantData._id)}
                      className={`h-9 text-xs rounded-lg font-bold transition-all shadow-none ${
                        currentApplicantData.status === "accepted"
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "border-zinc-200 text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      Shortlist Candidate
                    </Button>
                    <Button
                      variant={currentApplicantData.status === "rejected" ? "default" : "outline"}
                      onClick={() => handleStatus("rejected", currentApplicantData._id)}
                      className={`h-9 text-xs rounded-lg font-bold transition-all shadow-none col-span-2 ${
                        currentApplicantData.status === "rejected"
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "border-zinc-200 text-rose-700 hover:bg-rose-50"
                      }`}
                    >
                      Reject Candidate
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column: AI assessment (7 cols) */}
              <div className="md:col-span-7 space-y-6">
                {/* Score Summary Panel */}
                <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-gradient-to-r from-primary/5 to-zinc-50 border border-primary/15 rounded-xl">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full border-4 border-primary/20 bg-white shadow-inner flex-shrink-0">
                    <span className="text-2xl font-extrabold text-primary">
                      {activeReport.score}%
                    </span>
                  </div>
                  <div className="text-center sm:text-left space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                      <Brain className="h-3 w-3" />
                      Verified Fit Rate
                    </div>
                    <p className="text-zinc-650 text-sm leading-relaxed">
                      {activeReport.feedback}
                    </p>
                  </div>
                </div>

                {/* Match Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="space-y-3 bg-emerald-50/20 border border-emerald-500/10 p-4 rounded-xl">
                    <h4 className="font-bold text-sm text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Key Strengths
                    </h4>
                    <ul className="space-y-2">
                      {activeReport.strengths.map((strength, idx) => (
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
                      {activeReport.recommendations.map((rec, idx) => (
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
                      {activeReport.matchedSkills.map((skill, idx) => (
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
                      {activeReport.missingSkills.map((skill, idx) => (
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
