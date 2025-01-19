import { Request, Response } from "express";
import { Company } from "../models/compony.model";
import { AuthRequest } from "../types";
import mongoose from "mongoose";
import { getDataUri } from "../utils/dataUri";
import cloudinary from "../config/cloudinary";

export const registerCompany = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const userId = user!._id;
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: userId,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in creating company", error.message);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};

//Get all company

export const getCompany = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const company = await Company.find({ userId });

    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        company,
        success: true,
      });
    }
    res.send({
      message: "company fetched successfully",
      company,
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

//Get company by id

export const getCompanyById = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(401).json({
        message: "company not found",
        success: false,
      });
    }
    return res.json({
      message: "Company fetched successfully",
      company,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getCompanyById");
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};

//update company detail

export const updateCompany = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, location, website } = req.body;

    const file = req.file;

    //validate id

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid company ID format" });
    }

    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content!);
    }
    const logo = cloudResponse?.secure_url;
    const updatedCompany = { name, description, location, website, logo };

    const company = await Company.findByIdAndUpdate(
      { _id: req.params.id },
      updatedCompany,
      { new: true }
    );

    if (!company) {
      return res.status(401).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in update company", error.message);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};
