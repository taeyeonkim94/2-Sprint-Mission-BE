import express from "express";
import { asyncHandler } from "../helper.js";
import {
  getProducts,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct
} from "../controllers/productsController.js";
const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", postProduct);
productRouter.patch("/:id", patchProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
