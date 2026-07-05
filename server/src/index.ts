import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/dataBase";
import authRouter from "./router/auth.router";
import companyRouter from "./router/company.router";
import jobRouter from "./router/job.router";
import applicationRouter from "./router/application.router";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
});

app.use("/api", limiter);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/applications", applicationRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 7777;

connectDB().then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`server is listening on Port ${PORT}`);
  });
});
