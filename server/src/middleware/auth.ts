
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export type UserRole = "ADMIN" | "STUDENT";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: UserRole;
  };
}

const prisma = new PrismaClient();

// Xac thuc JWT
export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      message: "Vui long dang nhap",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "Chua cau hinh JWT_SECRET",
    });
  }

  try {
    const payload = jwt.verify(token, secret);

    if (
      typeof payload === "string" ||
      typeof payload.id !== "number" ||
      typeof payload.username !== "string" ||
      (payload.role !== "ADMIN" && payload.role !== "STUDENT")
    ) {
      return res.status(401).json({
        message: "Token khong hop le",
      });
    }

    req.user = {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Token het han hoac khong hop le",
    });
  }
}

// Kiem tra tai khoan va quyen Admin tu database
export async function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Vui long dang nhap",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        role: true,
        status: true,
      },
    });

    if (!user || user.status !== "ACTIVE") {
      return res.status(401).json({
        message: "Tai khoan khong hop le hoac da bi khoa",
      });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Ban khong co quyen thuc hien thao tac nay",
      });
    }

    next();
  } catch (error) {
    console.error("Loi kiem tra quyen Admin:", error);

    return res.status(500).json({
      message: "Loi may chu",
    });
  }
}
