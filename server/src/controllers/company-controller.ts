import { Request, Response } from "express";
import { Company } from "../models/compony.model";
import { AuthRequest } from "../types";
import mongoose from "mongoose";

export const registerCompany = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, website, location } = req.body;

    if (!name || !description || !website || !location) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }
    const existingCompany = await Company.findOne({ name });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company Already Exist",
        success: false,
      });
    }

    const newCompany = await Company.create({
      name,
      description,
      location,
      website,
      userId: req.user?._id,
    });

    return res.status(201).json({
      message: "Comapny registered successfully",
      newCompany,
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

    // const file = req.files
    const updatedCompany = { name, description, location, website };

    //validate id

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid company ID format" });
    }

    const company = await Company.findOneAndUpdate(
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
