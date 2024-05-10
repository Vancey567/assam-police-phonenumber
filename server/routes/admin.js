import { Router } from "express";
const adminRouter = Router();

import {
  createAdmin,
  getAdmins,
} from "../controllers/admin/admin-controller.js";
import { isLoggedIn } from "../middlewares/auth-middleware.js";

adminRouter.get("/", isLoggedIn, getAdmins);
adminRouter.post("/", createAdmin);

export default adminRouter;
