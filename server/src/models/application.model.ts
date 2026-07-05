import mongoose from "mongoose";
import { IApplication } from "../types";

interface ApplicationDocument extends IApplication, mongoose.Document {}
const applicationSchema = new mongoose.Schema<ApplicationDocument>(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending", "interview"],
      default: "pending",
    },
    aiAssessment: {
      score: { type: Number },
      feedback: { type: String },
      matchedSkills: [{ type: String }],
      missingSkills: [{ type: String }],
      strengths: [{ type: String }],
      recommendations: [{ type: String }],
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model<ApplicationDocument>(
  "Application",
  applicationSchema
);
