import express, { RequestHandler, Router } from "express";
import {
  login,
  logout,
  registerUser,
  updateProfile,
  getMe,
  parseResume,
} from "../controllers/user.controller";
import { userAuth } from "../middlewares/auth.middleware";
import { AuthRequest, LoginBody, RegisterBody } from "../types";
import { singleUpload, multiUpload } from "../middlewares/multer.middleware";

const authRouter: Router = express.Router();

authRouter.get("/me", userAuth, getMe as RequestHandler);

authRouter.post(
  "/register",
  singleUpload,
  registerUser as RequestHandler<{}, {}, RegisterBody>,
);

authRouter.post("/login", login as RequestHandler<{}, {}, LoginBody>);
authRouter.post("/logout", logout as RequestHandler);
authRouter.post(
  "/profile/update",
  userAuth,
  multiUpload,
  updateProfile as RequestHandler<{}, {}, {}, {}, AuthRequest>,
);

authRouter.post(
  "/parse-resume",
  userAuth,
  singleUpload,
  parseResume as RequestHandler,
);

export default authRouter;
