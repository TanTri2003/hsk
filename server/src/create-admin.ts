
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prisma = new PrismaClient();
const rl = readline.createInterface({ input, output });

async function main() {
  const username = (await rl.question("Nhap tai khoan Admin: ")).trim();
  const password = await rl.question("Nhap mat khau Admin: ");

  if (!username || password.length < 8) {
    throw new Error(
      "Tai khoan khong duoc de trong; mat khau toi thieu 8 ky tu."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { username },
    update: {
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
    create: {
      username,
      passwordHash,
      fullName: "Administrator",
      role: "ADMIN",
      status: "ACTIVE",
    },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  console.log("Da tao/cap nhat tai khoan Admin:", admin);
}

main()
  .catch((error) => {
    console.error("Khong the tao Admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    rl.close();
    await prisma.$disconnect();
  });
