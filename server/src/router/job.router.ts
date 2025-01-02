import express, { RequestHandler } from "express";
import { getAllJob, getJobById, jobPost } from "../controllers/job.controller";
import { userAuth } from "../middlewares/auth.middleware";

const jobRouter = express.Router();

jobRouter.post("/post", userAuth, jobPost as RequestHandler);
jobRouter.get("/get", userAuth, getAllJob as RequestHandler);
jobRouter.get("/get/:id", userAuth, getJobById as RequestHandler);
jobRouter.get("/getadminjobs", userAuth, getAllJob as RequestHandler);

export default jobRouter;
