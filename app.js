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
//**************************ArticleComment*****************************************/
// app.get(
//   "/article-comments",
//   asyncHandler(async (req, res) => {
//     const { limit = 10, cursor } = req.query;
//     const query = {
//       orderBy: { createdAt: "desc" },
//       take: parseInt(limit)
//     };
//     if (cursor) {
//       query.cursor = { id: cursor };
//       query.skip = 1;
//     }
//     const comments = await prisma.articleComment.findMany(query);
//     res.send(comments);
//   })
// );
// app.get(
//   "/article-comments/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const comment = await prisma.articleComment.findUniqueOrThrow({
//       where: { id }
//     });
//     res.send(comment);
//   })
// );
// app.post(
//   "/article-comments",
//   asyncHandler(async (req, res) => {
//     const { userId, articleId, ...commentFields } = req.body;
//     console.log(userId);
//     console.log(articleId);
//     console.log(commentFields);
//     //assert(commentFields, CreateArticleComment);
//     const comment = await prisma.articleComment.create({
//       data: {
//         user: { connect: { id: userId } },
//         article: { connect: { id: articleId } },
//         ...commentFields
//       }
//     });
//     console.log(1);
//     res.status(201).send(comment);
//   })
// );
// app.patch(
//   "/article-comments/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     //assert(req.body, PatchArticleComment);
//     const comment = await prisma.articleComment.update({
//       where: { id },
//       data: req.body
//     });
//     console.log(`성공:${comment}`);
//     res.status(203).send(comment);
//   })
// );
// app.delete(
//   "/article-comments/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const comment = await prisma.articleComment.delete({
//       where: { id }
//     });
//     res.sendStatus(204);
//   })
// );

app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행중입니다.`));
