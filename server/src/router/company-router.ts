import express, { RequestHandler } from "express";
import { userAuth } from "../middlewares/auth.middleware";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company-controller";

const companyRouter = express.Router();

companyRouter.post("/register", userAuth, registerCompany as RequestHandler);

companyRouter.get("/get", userAuth, getCompany as RequestHandler);

companyRouter.get("/get/:id", userAuth, getCompanyById as RequestHandler);

companyRouter.put("/update/:id", userAuth, updateCompany as RequestHandler);

export default companyRouter;
