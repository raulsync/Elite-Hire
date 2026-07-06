export interface UserProfile {
  bio?: string;
  skills?: string[];
  profilePhoto?: string;
  resumeUrl?: string;
  resumeName?: string;
  company?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: "Student" | "Recruiter";
  profile?: UserProfile;
}

export interface Company {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  website?: string;
  logo?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  experience?: number;
  salary: string;
  jobType: string;
  position: string;
  company: Company;
  created_by: string;
  applications: { applicant: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface RecommendedJob extends Job {
  matchScore: number;
  matchedSkills: string[];
}

export interface AIAssessment {
  score: number;
  feedback: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  recommendations: string[];
}

export interface Application {
  _id: string;
  job: Job;
  applicant: string;
  status: "accepted" | "rejected" | "pending" | "interview";
  aiAssessment?: AIAssessment;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  _id: string;
  recipient: string;
  type:
    | "application_received"
    | "status_update"
    | "new_job_match"
    | "interview_scheduled";
  title: string;
  message: string;
  read: boolean;
  relatedJob?: { _id: string; title: string };
  relatedApplication?: string;
  createdAt: string;
}

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}

export interface DashboardStats {
  totalJobs: number;
  totalApplications: number;
  statusBreakdown: {
    pending: number;
    accepted: number;
    rejected: number;
    interview: number;
  };
}

export interface FunnelData {
  stage: string;
  count: number;
}

export interface SkillData {
  skill: string;
  count: number;
}

export interface TrendData {
  date: string;
  count: number;
}
