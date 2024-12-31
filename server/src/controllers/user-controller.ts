import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AuthRequest } from "../types";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;

    if (!name || !email || !password || !phoneNumber || !role) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    //user exists or not

    const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (user) {
      return res.status(400).json({
        message: "User already exist with same email or phonenumber",
        success: false,
      });
    }

    //password hash

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      role,
    });
    await newUser.save();
    return res.json({
      data: newUser,
      message: "User saved successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};

//Login

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(401).json({
        message: "All fields are required",
        success: false,
      });
    }

    //find user

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message: "user not found",
        success: false,
      });
    }

    //compare password with hashed password

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        message: "Incorrect Password",
        success: false,
      });
    }

    //generate token
    const jwtConfig = {
      userId: user!._id,
    };

    const token = await jwt.sign(jwtConfig, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .send({
        message: `Welcome ${user?.name}`,
        user,
        success: true,
      });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in login", error.message);
      return res.status(501).json({
        message: error.message,
        success: false,
      });
    }
  }
};

//logout

export const logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).send({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in logout api", error.message);
      return res.status(501).json({
        message: error.message,
        success: false,
      });
    }
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phoneNumber, skills } = req.body;
    if (!name || !email || !phoneNumber || !skills) {
      return res.status(401).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    const skillsArray = skills.split(",");

    user.name = name;
    user.email = email;
    user.profile = {
      ...user.profile,
      skills: skillsArray,
    };
    user.phoneNumber = phoneNumber;

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in update profile api", error.message);
      return res.status(501).json({
        message: error.message,
        success: false,
      });
    }
  }
};
