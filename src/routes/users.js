import { Router } from "express";
import UsersController from "../controllers/UsersController";
import Authorize from "../middlewares/Authorize";

const router = Router();

router.get("/", Authorize.check, UsersController.index);

export default router;
