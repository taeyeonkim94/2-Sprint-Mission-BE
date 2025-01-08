import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../helper.js";
const prisma = new PrismaClient();
const NOT_AUTHORIZED_MESSAGE = "You are not authorized to update this product.";
export const authorizeProductOwner = async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: parseInt(id) }
  });
  if (userId !== product.userId)
    return res.status(403).send({ message: NOT_AUTHORIZED_MESSAGE });
  next();
};
