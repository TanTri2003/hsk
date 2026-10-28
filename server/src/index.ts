
import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth";

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin không được phép truy cập"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hanzi Edu API dang hoat dong" });
});

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "OK", database: "Connected" });
  } catch (error) {
    console.error("Loi ket noi database:", error);
    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
    });
  }
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Hanzi Edu API: http://localhost:${PORT}`);
});
