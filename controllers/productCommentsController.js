import { asyncHandler, checkAndConvertPageParams } from "../helper.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getProductCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.productComment.findUniqueOrThrow({
    where: { id }
  });
  res.send(comment);
});
export const getProductComments = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { cursor, limit = 10 } = req.query;
  const query = {
    orderBy: {
      createdAt: "desc"
    },
    take: parseInt(limit)
  };
  if (cursor) {
    query.cursor = { id: cursor };
    query.skip = 1;
  }
  const comments = await prisma.productComment.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    take: parseInt(limit)
  });
  res.send(comments);
});

export const postProductComment = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { userId, ...commentFields } = req.body;
  //assert(commentFields, CreateProductComment);
  const comment = await prisma.productComment.create({
    data: {
      user: { connect: { id: userId } },
      product: { connect: { id: productId } },
      ...commentFields
    }
  });
  res.status(201).send(comment);
});

export const patchProductComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //assert(req.body, patchProductCommnet);
  const comment = await prisma.productComment.update({
    where: { id },
    data: req.body
  });
  res.status(201).send(comment);
});

export const deleteProductComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.productComment.delete({
    where: { id }
  });
  res.sendStatus(204);
});
