import { Router } from "express";
import WaitlistController from "../controllers/SubscriptionController";

const router = Router();
;
router.post("/waitlist", WaitlistController.subscribe);

export default router;
