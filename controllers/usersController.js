import { asyncHandler } from "../helper.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});
export const getUserById = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  res.send(user);
});
