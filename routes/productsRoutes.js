import express from "express";
import { asyncHandler } from "../helper.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getProducts,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct
} from "../controllers/productsController.js";
import { authorizeProductOwner } from "../middlewares/authorizationMiddleware.js";
const productRouter = express.Router();
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", authMiddleware(), postProduct);
productRouter.patch(
  "/:id",
  authMiddleware(),
  authorizeProductOwner,
  patchProduct
);
productRouter.delete(
  "/:id",
  authMiddleware(),
  authorizeProductOwner,
  deleteProduct
);

export default productRouter;
