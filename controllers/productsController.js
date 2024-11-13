import { asyncHandler, checkAndConvertPageParams } from "../helper.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const NOT_FOUND_MESSAGE = "Cannot find given id.";
const NOT_FOUND_USERID_MESSAGE = "User ID is required";
const NOT_AUTHORIZED_MESSAGE = "You are not authorized to update this product.";
export const getProducts = asyncHandler(async (req, res) => {
  const { page, pageSize, order, keyword } = checkAndConvertPageParams(
    req.query
  );
  const orderBy =
    order === "oldest"
      ? { createdAt: "asc" }
      : order === "recent"
      ? { createdAt: "desc" }
      : order === "favoritest"
      ? { favoriteCount: "desc" }
      : {};
  const whereClause = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } }
        ]
      }
    : undefined;
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      orderBy,
      skip: page * pageSize,
      take: pageSize,
      where: whereClause
    }),
    prisma.product.count({ where: whereClause })
  ]);
  res.send({ products, totalCount });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUniqueOrThrow(id);
  res.send(product);
});

export const postProduct = asyncHandler(async (req, res) => {
  const { price, ...otherProductData } = req.body;
  const productData = {
    ...otherProductData,
    price: parseInt(price)
  };
  const { userId } = req.user;
  //assert(productData, CreateProduct);
  if (!userId) throw new Error(NOT_FOUND_USERID_MESSAGE);
  const product = await prisma.product.create({
    data: {
      ...productData,
      user: {
        connect: { id: userId }
      }
    }
  });
  res.status(201).send(product);
});
export const patchProduct = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const parseIntId = parseInt(id);
  //assert(req.body, patchProduct);
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: parseIntId }
  });
  if (!product) res.status(404).send({ message: NOT_FOUND_MESSAGE });
  if (userId !== product.userId)
    res.status(403).send({ message: NOT_AUTHORIZED_MESSAGE });
  const updatedProduct = await prisma.product.update({
    where: { id: parseId },
    data: req.body
  });
  res.status(201).send(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const parseIntId = parseInt(id);
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: parseIntId }
  });
  if (!product) res.status(404).send({ message: NOT_FOUND_MESSAGE });
  if (userId !== product.userId)
    res.status(403).send({ message: NOT_AUTHORIZED_MESSAGE });
  const deletedproduct = await prisma.product.delete({
    where: { id: parseIntId }
  });
  res.sendStatus(204);
});
