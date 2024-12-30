import mongoose from "mongoose";
import validator from "validator";

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
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Your email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
      validate: (value) => {
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
        required: true,
        validate: (value) => {
          if (!validator.isURL(value)) {
            throw new Error("Invalid Url");
          }
        },
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
