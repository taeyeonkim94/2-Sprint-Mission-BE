import { asyncHandler, checkAndConvertPageParams } from "../helper.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const createAccessToken = (user) => {
  const payload = { userId: user.id };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};
const createRefreshToken = (user) => {
  const payload = { userId: user.id };
  const options = { expiresIn: "7d" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) res.sendStatus(401);
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, user) => {
      if (err) res.sendStatus(403);
      const userId = user.id;
      const dbUser = prisma.user.findUniqueOrThrow({ where: { id: userId } });
      if (!dbUser) res.sendStatus(403);
      const newAccessToken = createAccessToken(dbUser);
      res.send({ accessToken: newAccessToken });
    }
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUniqueOrThrow({ where: { email } });
  if (!user)
    res.status(401).send({ message: "입력한 email의 유저가 없습니다" });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: "비밀번호가 잘못되었습니다." });
  }
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  res.send({ message: "로그인 성공", accessToken, refreshToken, user });
});
