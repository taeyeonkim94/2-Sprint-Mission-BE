import express from "express";
import { asyncHandler } from "../helper.js";
import {
  getArticleById,
  getArticles,
  postArticle,
  patchArticle,
  deleteArticle
} from "../controllers/articlesController.js";
const articleRouter = express.Router();

articleRouter.get("/", getArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", postArticle);
articleRouter.patch("/:id", patchArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
