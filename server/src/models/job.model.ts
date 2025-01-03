import mongoose from "mongoose";
import { IJob } from "../types";

export interface JobDocument extends Omit<Document, "location">, IJob {}

const jobSchema = new mongoose.Schema<JobDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: String,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },
  ],
});

export const Job = mongoose.model("Job", jobSchema);
