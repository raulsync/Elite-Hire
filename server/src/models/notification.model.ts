import mongoose from "mongoose";

export interface INotification {
  recipient: mongoose.Types.ObjectId;
  type: "application_received" | "status_update" | "new_job_match" | "interview_scheduled";
  title: string;
  message: string;
  read: boolean;
  relatedJob?: mongoose.Types.ObjectId;
  relatedApplication?: mongoose.Types.ObjectId;
}

interface NotificationDocument extends INotification, mongoose.Document {}

const notificationSchema = new mongoose.Schema<NotificationDocument>(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["application_received", "status_update", "new_job_match", "interview_scheduled"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    relatedJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    relatedApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<NotificationDocument>(
  "Notification",
  notificationSchema
);
