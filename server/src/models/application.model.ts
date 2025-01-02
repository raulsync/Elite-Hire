import mongoose from "mongoose";
import { IApplication } from "../types";

interface ApplicationDocument extends IApplication {}
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
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model<ApplicationDocument>(
  "Application",
  applicationSchema
);
