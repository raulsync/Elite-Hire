import { Response } from "express";
import { AuthRequest } from "../types";
import { Notification } from "../models/notification.model";
import logger from "../utils/logger";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated", success: false });
    }

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("relatedJob", "title company")
      .lean();

    const unreadCount = await Notification.countDocuments({
      recipient: userId,
      read: false,
    });

    return res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error fetching notifications", error);
      return res.status(500).json({ message: error.message, success: false });
    }
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated", success: false });
    }

    if (id === "all") {
      await Notification.updateMany(
        { recipient: userId, read: false },
        { $set: { read: true } }
      );
    } else {
      await Notification.findOneAndUpdate(
        { _id: id, recipient: userId },
        { $set: { read: true } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error marking notifications as read", error);
      return res.status(500).json({ message: error.message, success: false });
    }
  }
};
