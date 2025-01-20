import mongoose from "mongoose";
import validator from "validator";
import { ICompany } from "../types";

export interface CompanyDocument extends Omit<Document, "location">, ICompany {}

const companySchema = new mongoose.Schema<CompanyDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
      validate: (value: string) => {
        if (!validator.isURL(value)) {
          throw new Error("Invalid url");
        }
      },
    },
    logo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model<CompanyDocument>(
  "Company",
  companySchema
);
