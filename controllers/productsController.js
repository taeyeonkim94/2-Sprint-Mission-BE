import { asyncHandler, checkAndConvertPageParams } from "../helper.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const NOT_FOUND_MESSAGE = "Cannot find given id.";
const NOT_FOUND_USERID_MESSAGE = "User ID is required";

export const getProducts = asyncHandler(async (req, res) => {
  const { page, pageSize, order, keyword } = checkAndConvertPageParams(
    req.query
  );
  const orderBy =
    order === "oldest"
      ? { createdAt: "asc" }
      : order === "newest"
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
  const { userId, price, ...otherProductData } = req.body;
  const productData = {
    ...otherProductData,
    price: parseInt(price)
  };
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
  const { id } = req.params;
  //assert(req.body, patchProduct);
  const product = await prisma.product.update({
    where: { id },
    data: req.body
  });
  res.status(201).send(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({ where: { id } });
  res.sendStatus(204);
});
