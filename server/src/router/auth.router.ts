import express, { RequestHandler, Router } from "express";
import {
  login,
  logout,
  registerUser,
  updateProfile,
} from "../controllers/user.controller";
import { userAuth } from "../middlewares/auth.middleware";
import { AuthRequest, LoginBody, RegisterBody } from "../types";
import { singleUpload } from "../middlewares/multer.middleware";

const authRouter: Router = express.Router();

authRouter.post(
  "/register",
  singleUpload,
  registerUser as RequestHandler<{}, {}, RegisterBody>
);

authRouter.post("/login", login as RequestHandler<{}, {}, LoginBody>);
authRouter.post("/logout", logout as RequestHandler);
authRouter.post(
  "/profile/update",
  userAuth,
  singleUpload,
  updateProfile as RequestHandler<{}, {}, {}, {}, AuthRequest>
);

export default authRouter;
