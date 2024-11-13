import express from "express";
import { Prisma } from "@prisma/client";
import config from "./config.js";
import cors from "cors";
import pkg from "@prisma/client"; // Default import
const { PrismaClient } = pkg; // PrismaClient 가져오기
import { assert } from "superstruct";
import {
  CreateProduct,
  PatchProduct,
  CreateArticle,
  PatchArticle,
  CreateProductComment,
  PatchProductCommnet,
  CreateArticleComment,
  PatchArticleComment
} from "./structs.js";
import { asyncHandler, checkAndConvertPageParams } from "./helper.js";
import usersRouter from "./routes/usersRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import articlesRouter from "./routes/articlesRoutes.js";
import productCommentsRouter from "./routes/productCommentsRoutes.js";
import articleCommentsRouter from "./routes/articleCommentsRoute.js";
import authRouter from "./routes/authRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = config.port || 3000;
const NOT_FOUND_MESSAGE = "Cannot find given id.";
const NOT_FOUND_USERID_MESSAGE = "User ID is required";

const prisma = new PrismaClient();
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/products/:productId/comments", productCommentsRouter);
app.use("/articles/:articleId/comments", articleCommentsRouter);
app.use("/auth", authRouter);
app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행중입니다.`));
