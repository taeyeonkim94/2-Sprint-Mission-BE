import { asyncHandler, checkAndConvertPageParams } from "../helper.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getArticleCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.articleComment.findUniqueOrThrow({
    where: { id }
  });
  res.send(comment);
});

export const getArticleComments = asyncHandler(async (req, res) => {
  const { limit = 10, cursor } = req.query;
  const query = {
    orderBy: { createdAt: "desc" },
    take: parseInt(limit)
  };
  if (cursor) {
    query.cursor = { id: cursor };
    query.skip = 1;
  }
  const comments = await prisma.articleComment.findMany(query);
  res.send(comments);
});

export const postArticleComment = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { userId, ...commentFields } = req.body;
  console.log(commentFields);
  //assert(commentFields, CreateArticleComment);
  const comment = await prisma.articleComment.create({
    data: {
      user: { connect: { id: userId } },
      article: { connect: { id: articleId } },
      ...commentFields
    }
  });
  res.status(201).send(comment);
});

export const patchArticleComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //assert(req.body, PatchArticleComment);
  const comment = await prisma.articleComment.update({
    where: { id },
    data: req.body
  });
  res.status(201).send(comment);
});

export const deleteArticleComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.articleComment.delete({ where: { id } });
  res.sendStatus(204);
});
