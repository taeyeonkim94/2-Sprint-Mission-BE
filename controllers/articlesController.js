import { asyncHandler, checkAndConvertPageParams } from "../helper.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const NOT_FOUND_MESSAGE = "Cannot find given id.";
const NOT_FOUND_USERID_MESSAGE = "User ID is required";

export const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUniqueOrThrow({ where: { id } });
  res.send(article);
});
export const getArticles = asyncHandler(async (req, res) => {
  const { page, pageSize, order, keyword } = checkAndConvertPageParams(
    req.query
  );
  const orderBy =
    order === "recent"
      ? { createdAt: "desc" }
      : order === "favoritest"
      ? { favoriteCount: "desc" }
      : { createdAt: "asc" };
  const whereClause = keyword
    ? {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } }
        ]
      }
    : undefined;
  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      orderBy,
      skip: page * pageSize,
      take: pageSize,
      where: whereClause
    }),
    prisma.article.count({ where: whereClause })
  ]);
  res.send({
    articles,
    totalCount
  });
});

export const postArticle = asyncHandler(async (req, res) => {
  const { userId, ...articleData } = req.body;
  //assert(articleData, CreateArticle);
  if (!userId) throw new Error(NOT_FOUND_USERID_MESSAGE);
  const article = await prisma.article.create({
    data: {
      ...articleData,
      user: {
        connect: { id: userId }
      }
    }
  });
  res.status(201).send(article);
});
export const patchArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //assert(req.body, patchArticle);
  const article = await prisma.article.update({
    where: { id },
    data: req.body
  });
  res.status(203).send(article);
});
export const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.delete({
    where: { id }
  });
  res.sendStatus(204);
});
