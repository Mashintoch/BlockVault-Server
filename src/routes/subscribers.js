const { Router } = require("express");
const WaitlistController = require("../controllers/SubscriptionController.js");

const router = Router();
router.post("/waitlist", WaitlistController.subscribe);

module.exports = router;
