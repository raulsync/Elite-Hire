import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dataBase";
import authRouter from "./router/auth.router";
import companyRouter from "./router/company.router";
import jobRouter from "./router/job.router";
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);

const PORT = process.env.PORT || 7777;

connectDB().then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`server is listening on Port ${PORT}`);
  });
});
