import { Response } from "express";
import { AuthRequest } from "../types";
import { Job } from "../models/job.model";
import { Application } from "../models/application.model";
import logger from "../utils/logger";
import mongoose from "mongoose";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Not authenticated", success: false });
    }

    const recruiterJobs = await Job.find({ created_by: userId }).select("_id");
    const jobIds = recruiterJobs.map((j) => j._id);

    const totalJobs = recruiterJobs.length;
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const statusBreakdown = await Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const statusMap: Record<string, number> = {};
    statusBreakdown.forEach((s) => {
      statusMap[s._id] = s.count;
    });

    return res.status(200).json({
      success: true,
      data: {
        totalJobs,
        totalApplications,
        statusBreakdown: {
          pending: statusMap["pending"] || 0,
          accepted: statusMap["accepted"] || 0,
          rejected: statusMap["rejected"] || 0,
          interview: statusMap["interview"] || 0,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in getDashboardStats", error);
      return res.status(500).json({ message: error.message, success: false });
    }
  }
};

export const getApplicationFunnel = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Not authenticated", success: false });
    }

    const recruiterJobs = await Job.find({ created_by: userId }).select("_id");
    const jobIds = recruiterJobs.map((j) => j._id);

    const funnel = await Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const funnelData = [
      { stage: "Applied", count: 0 },
      { stage: "Screening", count: 0 },
      { stage: "Interview", count: 0 },
      { stage: "Accepted", count: 0 },
    ];

    funnel.forEach((f) => {
      const total = funnel.reduce((sum, item) => sum + item.count, 0);
      if (f._id === "pending") funnelData[0].count = total;
      if (f._id === "pending") funnelData[1].count = Math.round(total * 0.6);
      if (f._id === "interview") funnelData[2].count = f.count;
      if (f._id === "accepted") funnelData[3].count = f.count;
    });

    if (funnelData[0].count === 0) {
      const total = funnel.reduce((sum, item) => sum + item.count, 0);
      funnelData[0].count = total;
      funnelData[1].count = Math.round(total * 0.6);
    }

    return res.status(200).json({
      success: true,
      data: funnelData,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in getApplicationFunnel", error);
      return res.status(500).json({ message: error.message, success: false });
    }
  }
};

export const getTopSkills = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Not authenticated", success: false });
    }

    const recruiterJobs = await Job.find({ created_by: userId }).select("_id");
    const jobIds = recruiterJobs.map((j) => j._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "profile.skills")
      .lean();

    const skillCount: Record<string, number> = {};
    applications.forEach((app: any) => {
      const skills = app.applicant?.profile?.skills || [];
      skills.forEach((skill: string) => {
        const normalized = skill.trim().toLowerCase();
        if (normalized) {
          skillCount[normalized] = (skillCount[normalized] || 0) + 1;
        }
      });
    });

    const topSkills = Object.entries(skillCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));

    return res.status(200).json({
      success: true,
      data: topSkills,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in getTopSkills", error);
      return res.status(500).json({ message: error.message, success: false });
    }
  }
};

export const getApplicationTrends = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Not authenticated", success: false });
    }

    const recruiterJobs = await Job.find({ created_by: userId }).select("_id");
    const jobIds = recruiterJobs.map((j) => j._id);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trends = await Application.aggregate([
      {
        $match: {
          job: { $in: jobIds },
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result: { date: string; count: number }[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const found = trends.find((t) => t._id === dateStr);
      result.push({ date: dateStr, count: found ? found.count : 0 });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in getApplicationTrends", error);
      return res.status(500).json({ message: error.message, success: false });
    }
  }
};

export const getRecommendedJobs = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authenticated", success: false });
    }

    const userSkills = (user.profile?.skills || []).map((s) =>
      s.toLowerCase().trim(),
    );

    if (userSkills.length === 0) {
      const latestJobs = await Job.find()
        .populate("company")
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();

      return res.status(200).json({
        success: true,
        data: latestJobs.map((job) => ({
          ...job,
          matchScore: 0,
          matchedSkills: [],
        })),
      });
    }

    const allJobs = await Job.find().populate("company").lean();

    const scoredJobs = allJobs.map((job) => {
      const requirements = Array.isArray(job.requirements)
        ? job.requirements.map((r: string) => r.toLowerCase().trim())
        : [];

      const matchedSkills = userSkills.filter((skill) =>
        requirements.some(
          (req: string) => req.includes(skill) || skill.includes(req),
        ),
      );

      const matchScore =
        requirements.length > 0
          ? Math.round((matchedSkills.length / requirements.length) * 100)
          : 0;

      return { ...job, matchScore, matchedSkills };
    });

    const recommended = scoredJobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);

    return res.status(200).json({
      success: true,
      data: recommended,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error in getRecommendedJobs", error);
      return res.status(500).json({ message: error.message, success: false });
    }
  }
};
