import "dotenv/config";
import bcrypt from "bcrypt";

import { prisma } from "../src/lib/prisma.js";

const BCRYPT_SALT_ROUNDS = 12;

async function seedAdmin() {
  const name = process.env.ADMIN_SEED_NAME;
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "ADMIN_SEED_NAME, ADMIN_SEED_EMAIL, and ADMIN_SEED_PASSWORD must be defined"
    );
  }

  const passwordHash = await bcrypt.hash(
    password,
    BCRYPT_SALT_ROUNDS
  );

  const admin = await prisma.admin.upsert({
    where: {
      email,
    },
    update: {
      name,
      passwordHash,
      role: "ADMIN",
    },
    create: {
      name,
      email,
      passwordHash,
      role: "ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  console.log("Admin seeded successfully:");
  console.table(admin);
}

seedAdmin()
  .catch((error) => {
    console.error("Admin seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });