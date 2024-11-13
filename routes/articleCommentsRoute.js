import express, { Router } from "express";
import { asyncHandler } from "../helper.js";
import {
  getArticleCommentById,
  getArticleComments,
  postArticleComment,
  patchArticleComment,
  deleteArticleComment
} from "../controllers/articleCommentsController.js";

const articleCommentsRouter = express.Router({ mergeParams: true });

articleCommentsRouter.get("/", getArticleComments);
articleCommentsRouter.get("/:id", getArticleCommentById);
articleCommentsRouter.post("/", postArticleComment);
articleCommentsRouter.patch("/:id", patchArticleComment);
articleCommentsRouter.delete("/:id", deleteArticleComment);

export default articleCommentsRouter;
