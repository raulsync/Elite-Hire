import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Please login",
        success: false,
      });
    }

    //validate token
    const decodedId = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const { _id } = decodedId;
    const user = User.findById(_id);
    if (!user) {
      throw new Error("User not found");
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
}
