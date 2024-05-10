import express from "express";
import passport from "../passport/passport.js";

const authRouter = express.Router();

import { login, logout } from "../controllers/auth/auth-controller.js";

authRouter.post("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
