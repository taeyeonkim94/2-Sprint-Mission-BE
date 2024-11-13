import express from "express";
import { asyncHandler } from "../helper.js";
import { getUserById, getUsers } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
export default userRouter;
