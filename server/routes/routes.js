import { Router } from "express";
const router = Router();

import admin from "./admin.js";
import auth from "./auth.js";
import police from "./police.js";

router.use("/admin", admin);
router.use("/", auth);
router.use("/police", police);

export default router;