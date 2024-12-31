import { Request, Response } from "express";
import { Company } from "../models/compony.model";
import { AuthRequest } from "../types";

export const registerCompany = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    const company = await Company.find({ name });
    if (company) {
      return res.status(400).json({
        message: "Company Already Exist",
        success: false,
      });
    }

    const newCompany = await Company.create({
      name: name,
      userId: req.user?._id,
    });
    return res.status(200).json({
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
