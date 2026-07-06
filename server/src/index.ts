import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { connectDB } from "./config/dataBase";
import authRouter from "./router/auth.router";
import companyRouter from "./router/company.router";
import jobRouter from "./router/job.router";
import applicationRouter from "./router/application.router";
import analyticsRouter from "./router/analytics.router";
import notificationRouter from "./router/notification.router";
import { errorHandler } from "./middlewares/error.middleware";
import logger from "./utils/logger";
import { createServer } from "http";
import { initializeSocket } from "./utils/socket";
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
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize());

app.use(hpp());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/user", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/notifications", notificationRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 7777;

const httpServer = createServer(app);
initializeSocket(httpServer);

connectDB().then(() => {
  logger.info("Database connection successful");
  httpServer.listen(PORT, () => {
    logger.info(`server is listening on Port ${PORT}`);
  });
});
