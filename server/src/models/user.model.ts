import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
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
        required: true,
      },
      resumeName: {
        type: String,
        required: true,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId, //it is basically used to create relation between two tables
        ref: "Company",
      },
      profilePhoto: {
        types: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
