import express, { RequestHandler } from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/application.controller";
import { userAuth } from "../middlewares/auth.middleware";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", userAuth, applyJob as RequestHandler);

applicationRouter.get("/get", userAuth, getAppliedJobs as RequestHandler);

applicationRouter.get(
  "/applicants/:id",
  userAuth,
  getApplicants as RequestHandler
);

applicationRouter.put(
  "/status/:id",
  userAuth,
  updateApplicationStatus as RequestHandler
);

export default applicationRouter;
