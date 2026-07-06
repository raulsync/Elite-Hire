import express, { RequestHandler } from "express";
import { userAuth } from "../middlewares/auth.middleware";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get("/", userAuth, getNotifications as RequestHandler);
notificationRouter.patch("/:id/read", userAuth, markAsRead as RequestHandler);

export default notificationRouter;
