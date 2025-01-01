import { NextFunction, Request } from "express";
import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "Recruiter" | "Student";
  profile?: {
    bio?: string;
    skills: string[];
    recruitmentUrl?: string;
    company?: string;
    profilePhoto?: string;
  };
}

export interface ICompany {
  _id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  logo: string;
  userId: Types.ObjectId;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export type AuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface JwtPayload {
  userId: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface LoginBody {
  email: string;
  password: string;
  role: string;
}
