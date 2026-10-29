
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import {
    authenticate,
    requireAdmin,
    type AuthRequest,
} from "../middleware/auth";

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
// Admin tạo tài khoản học sinh
router.post(
    "/students",
    authenticate,
    requireAdmin,
    async (req, res) => {
    try {
        const authReq = req as AuthRequest;

        // Kiểm tra quyền Admin từ token đã xác thực
        if (authReq.user?.role !== "ADMIN") {
            return res.status(403).json({
                message: "Ban khong co quyen thuc hien thao tac nay",
            });
        }

        const { username, fullName, password } = req.body ?? {};

        if (
            typeof username !== "string" ||
            typeof fullName !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !fullName.trim() ||
            password.length < 8
        ) {
            return res.status(400).json({
                message:
                    "Vui long nhap tai khoan, ho ten va mat khau toi thieu 8 ky tu",
            });
        }

        const normalizedUsername = username.trim();

        const existingUser = await prisma.user.findUnique({
            where: { username: normalizedUsername },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Ten dang nhap da ton tai",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const student = await prisma.user.create({
            data: {
                username: normalizedUsername,
                fullName: fullName.trim(),
                passwordHash,
                role: "STUDENT",
                status: "ACTIVE",
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });

        return res.status(201).json({
            message: "Tao tai khoan hoc sinh thanh cong",
            student,
        });
    } catch (error) {
        // Phòng trường hợp hai yêu cầu tạo cùng username đồng thời
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002"
        ) {
            return res.status(409).json({
                message: "Ten dang nhap da ton tai",
            });
        }

        console.error("Loi tao tai khoan hoc sinh:", error);

        return res.status(500).json({
            message: "Loi may chu",
        });
    }
});
// Admin xem danh sach tai khoan hoc vien
router.get(
    "/students",
    authenticate,
    requireAdmin,
    async (_req, res) => {
        try {
            const students = await prisma.user.findMany({
                where: {
                    role: "STUDENT",
                },
                select: {
                    id: true,
                    username: true,
                    fullName: true,
                    role: true,
                    status: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return res.json({ students });
        } catch (error) {
            console.error("Loi lay danh sach hoc vien:", error);

            return res.status(500).json({
                message: "Loi may chu",
            });
        }
    }
);
export default router;
