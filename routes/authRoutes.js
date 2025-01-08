import express from "express";
import { asyncHandler } from "../helper.js";

import {
  refreshAccessToken,
  loginUser
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/refresh-token", refreshAccessToken);
authRouter.post("/signIn", loginUser);
export default authRouter;
