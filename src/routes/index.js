import express from "express";

import users from "./users";
import auth from "./auth";
import subscribers from "./subscribers"


const router = express.Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/subscribers", subscribers);

export default router;