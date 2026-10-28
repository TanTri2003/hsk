
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { authenticate, type AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body ?? {};

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Vui long nhap tai khoan va mat khau",
      });
    }

    const user = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    if (!user || user.status !== "ACTIVE") {
      return res.status(401).json({
        message: "Tai khoan hoac mat khau khong dung",
      });
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordValid) {
      return res.status(401).json({
        message: "Tai khoan hoac mat khau khong dung",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "Chua cau hinh JWT_SECRET",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      secret,
      { expiresIn: "8h" }
    );

    return res.json({
      message: "Dang nhap thanh cong",
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Loi dang nhap:", error);

    return res.status(500).json({
      message: "Loi may chu",
    });
  }
});

router.get("/me", authenticate, async (req, res) => {
  const authReq = req as AuthRequest;

  const user = await prisma.user.findUnique({
    where: { id: authReq.user!.id },
    select: {
      id: true,
      username: true,
      fullName: true,
      role: true,
      status: true,
    },
  });

  if (!user || user.status !== "ACTIVE") {
    return res.status(401).json({
      message: "Tai khoan khong hop le",
    });
  }

  return res.json({ user });
});

export default router;
