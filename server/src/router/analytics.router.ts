import express, { RequestHandler } from "express";
import { userAuth, authorizeRoles } from "../middlewares/auth.middleware";
import {
  getDashboardStats,
  getApplicationFunnel,
  getTopSkills,
  getApplicationTrends,
  getRecommendedJobs,
} from "../controllers/analytics.controller";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/dashboard",
  userAuth,
  authorizeRoles("Recruiter") as RequestHandler,
  getDashboardStats as RequestHandler,
);

analyticsRouter.get(
  "/funnel",
  userAuth,
  authorizeRoles("Recruiter") as RequestHandler,
  getApplicationFunnel as RequestHandler,
);

analyticsRouter.get(
  "/skills",
  userAuth,
  authorizeRoles("Recruiter") as RequestHandler,
  getTopSkills as RequestHandler,
);

analyticsRouter.get(
  "/trends",
  userAuth,
  authorizeRoles("Recruiter") as RequestHandler,
  getApplicationTrends as RequestHandler,
);

analyticsRouter.get(
  "/recommendations",
  userAuth,
  getRecommendedJobs as RequestHandler,
);

export default analyticsRouter;
