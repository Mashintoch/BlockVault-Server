import { Router } from "express";
import AuthController from "../controllers/AuthController";
import Validate from "../middlewares/Validate";
import Authorize from "../middlewares/Authorize";
import authSchemas from "../schemas/auth";

const router = Router();

router.post(
  "/signin",
  Validate.prepare(authSchemas.signin),
  AuthController.signin
);
router.post(
  "/signup",
  Validate.prepare(authSchemas.signup),
  AuthController.signup
);
router.post(
  "/refresh-tokens",
  Validate.prepare(authSchemas.refreshTokens),
  AuthController.refreshTokens
);
router.post("/logout", Authorize.check, AuthController.logout);
router.post(
  "/restore-password",
  Validate.prepare(authSchemas.restorePassword),
  AuthController.restorePassword
);
router.post(
  "/confirm-restore-password",
  Validate.prepare(authSchemas.confirmRestorePassword),
  AuthController.confirmRestorePassword
);

export default router;
