import { asyncHandler } from "../helper.js";
import { PrismaClient } from "@prisma/client";
import { CreateUser } from "../structs.js";
import { assert } from "superstruct";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  res.send(user);
});
export const createUser = asyncHandler(async (req, res) => {
  assert(req.body, CreateUser);
  const { password, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword
    }
  });
  res.send(user);
});
