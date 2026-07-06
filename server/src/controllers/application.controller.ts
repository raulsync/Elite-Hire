import { Response } from "express";
import { AuthRequest } from "../types";
import { Application } from "../models/application.model";
import { Job } from "../models/job.model";
import { generateAIAssessment } from "../utils/gemini";
import { Notification } from "../models/notification.model";
import { emitToUser } from "../utils/socket";
import logger from "../utils/logger";

export const applyJob = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const userId = user?._id;
    const jobId = req.params.id;

    if (user?.role === "Recruiter") {
      return res.status(400).send({
        message: "Recruiters are not allowed to apply for jobs.",
        success: false,
      });
    }

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

    job.applications.push(application._id as any);
    await application.save();
    await job.save();

    try {
      const notification = await Notification.create({
        recipient: job.created_by,
        type: "application_received",
        title: "New Application Received",
        message: `${user?.name || "A candidate"} applied for ${job.title}`,
        relatedJob: job._id,
        relatedApplication: application._id,
      });
      emitToUser(job.created_by.toString(), "notification:new", notification);
    } catch (notifErr) {
      logger.error("Failed to create application notification", notifErr);
    }

    return res.status(200).send({
      message: "application sent successfully",
      data: application,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in applyJob", error);
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
      logger.error("Error in getAppliedJob", error);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};

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

    const applications = job.applications as any[];
    for (const app of applications) {
      if (!app.aiAssessment || app.aiAssessment.score === undefined) {
        try {
          const reqs = Array.isArray(job.requirements)
            ? (job.requirements as string[])
            : typeof job.requirements === "string"
              ? (job.requirements as string).split(",").map((s) => s.trim())
              : [];
          const assessment = await generateAIAssessment(
            app.applicant,
            job.title,
            reqs,
            job.description || "",
          );
          app.aiAssessment = assessment;
          await app.save();
        } catch (err) {
          logger.error(
            `Failed to generate AI assessment for application ${app._id}:`,
            err as Error,
          );
        }
      }
    }

    res.status(200).send({
      data: job,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in getApplicants", error);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};

export const updateApplicationStatus = async (
  req: AuthRequest,
  res: Response,
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

    const allowedStatus = ["accepted", "rejected", "pending", "interview"];

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

    try {
      const statusLabels: Record<string, string> = {
        accepted: "accepted ",
        rejected: "not selected",
        interview: "moved to interview stage",
        pending: "set back to pending",
      };
      const notification = await Notification.create({
        recipient: application.applicant,
        type: "status_update",
        title: "Application Status Updated",
        message: `Your application has been ${statusLabels[status] || status}`,
        relatedJob: application.job,
        relatedApplication: application._id,
      });
      emitToUser(
        application.applicant.toString(),
        "notification:new",
        notification,
      );
    } catch (notifErr) {
      logger.error("Failed to create status notification", notifErr);
    }

    return res.status(200).send({
      message: "Application status updated successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in update status", error);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
  }
};
