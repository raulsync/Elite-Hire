import { Response } from "express";
import { AuthRequest } from "../types";
import { Job } from "../models/job.model";
import { buildSearchQuery } from "../utils/searchQuery";

export const jobPost = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      experience,
      salary,
      jobType,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !experience ||
      !salary ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    const user = req.user;
    const userId = user?._id;

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      location,
      experience: Number(experience),
      salary: Number(salary),
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).send({
      message: "job created successfully",
      data: job,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured in posting job", error.message);
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};

//get all job

export const getAllJob = async (req: AuthRequest, res: Response) => {
  try {
    const searchQuery = buildSearchQuery(req);

    const filters = {
      ...searchQuery,
    };

    const job = await Job.find(filters);

    // .sort({
    //   createdAt: -1,
    // })
    // .limit(parseInt(req.query.limit) || 10);

    return res.status(201).json({
      message: "all jobs fetched successfully",
      success: true,
      data: job,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in get all job", error.message);
      return res.status(500).json({});
    }
  }
};

//get job by id
export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(201).send({
      message: "Company fetched successfully",
      job,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in get job by id");
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};

export const getAdminJob = async (req: AuthRequest, res: Response) => {
  try {
    const adminId = req.user?._id;

    const adminJob = await Job.findById({ created_by: adminId });

    if (!adminJob) {
      return res.status(400).send({
        message: "admin job not found",
        success: false,
      });
    }

    return res.status(201).send({
      message: "Admin job fetched successfully",
      data: adminJob,
      success: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getAdminJOb", error.message);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};
