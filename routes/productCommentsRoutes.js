import express from "express";
import { asyncHandler } from "../helper.js";
import {
  getProductCommentById,
  getProductComments,
  postProductComment,
  patchProductComment,
  deleteProductComment
} from "../controllers/productCommentsController.js";
const productCommentsRouter = express.Router({ mergeParams: true });

productCommentsRouter.get("/", getProductComments);
productCommentsRouter.get("/:id", getProductCommentById);
productCommentsRouter.post("/", postProductComment);
productCommentsRouter.patch("/:id", patchProductComment);
productCommentsRouter.delete("/:id", deleteProductComment);

export default productCommentsRouter;
