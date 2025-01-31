import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "../types";

interface UserDocument extends IUser, Document {}
const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value: string) => {
        if (!validator.isEmail(value)) {
          throw new Error("Your email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      // maxLength: 50,
      validate: (value: string) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Your password is not valid");
        }
      },
    },
    phoneNumber: {
      type: String,
      minLength: 10,
      maxLength: 10,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Recruiter", "Student"],
      default: "Student",
      required: true,
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [
        {
          type: String,
        },
      ],
      resumeUrl: {
        type: String,
        // required: true,
      },
      resumeName: {
        type: String,
        // required: true,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId, //it is basically used to create relation between two tables
        ref: "Company",
      },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
