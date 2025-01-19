import express, { RequestHandler } from "express";
import { userAuth } from "../middlewares/auth.middleware";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller";
import { singleUpload } from "../middlewares/multer.middleware";

const companyRouter = express.Router();

companyRouter.post("/register", userAuth, registerCompany as RequestHandler);

companyRouter.get("/get", userAuth, getCompany as RequestHandler);

companyRouter.get("/get/:id", userAuth, getCompanyById as RequestHandler);

companyRouter.put(
  "/update/:id",
  userAuth,
  singleUpload,
  updateCompany as RequestHandler
);

export default companyRouter;
