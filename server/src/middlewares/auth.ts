import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AuthMiddleware, AuthRequest, JwtPayload } from "../types";

export const userAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({
        message: "Please login",
        success: false,
      });
      return;
    }

    //validate token
    const decodedId = (await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    )) as JwtPayload;
    // const { _id } = decodedId;
    const user = await User.findById(decodedId.userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
        success: false,
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: "You are unauthorized",
        error: error.message,
        success: false,
      });
    }
  }
};
