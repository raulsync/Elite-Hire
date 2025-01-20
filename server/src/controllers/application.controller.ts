import { Response } from "express";
import { AuthRequest } from "../types";
import { Application } from "../models/application.model";
import { Job } from "../models/job.model";

export const applyJob = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const userId = user?._id;
    const jobId = req.params.id;

    if (!jobId || !userId) {
      return res.status(400).send({
        message: "Missing fields(jobId or userId)",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).send({
        message: "You have already applied for this job",
        success: true,
      });
    }

    //check job exist or not

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).send({
        message: "Job not found",
        success: false,
      });
    }

    const application = new Application({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(application._id);
    await application.save();
    await job.save();
    return res.status(200).send({
      message: "application sent successfully",
      data: application,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in applyJob", error.message);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};

export const getAppliedJobs = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const userId = user?._id;

    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });

    if (!application) {
      return res.status(400).send({
        message: "Application not found",
        success: false,
      });
    }
    return res.status(200).send({
      application,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getAppliedJob", error.message);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};

//get applicants

export const getApplicants = async (req: AuthRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(401).send({
        message: "JobId is required",
        success: false,
      });
    }
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });

    if (!job) {
      return res.status(401).send({
        message: "Job not found",
        success: false,
      });
    }

    res.status(200).send({
      data: job,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getApplicants");
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};

export const updateApplicationStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!applicationId) {
      return res.status(400).send({
        message: "Application ID is required.",
        success: false,
      });
    }

    const allowedStatus = ["accepted", "rejected", "pending"];

    if (!allowedStatus.includes(status)) {
      return res.status(401).send({
        message: "Invalid Status",
        success: false,
      });
    }

    const application = await Application.findById({ _id: applicationId });

    if (!application) {
      return res.status(404).send({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLocaleLowerCase();
    await application.save();

    return res.status(200).send({
      message: "Application status updated successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in update status", error.message);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};
