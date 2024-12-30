import express, { RequestHandler, Router } from "express";
import { login, logout, registerUser } from "../controllers/user-controller";

const authRouter: Router = express.Router();

authRouter.post("/register", registerUser as RequestHandler);

authRouter.post("/login", login as RequestHandler);
authRouter.post("/logout", logout as RequestHandler);

export default authRouter;
