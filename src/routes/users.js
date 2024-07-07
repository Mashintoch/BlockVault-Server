const { Router } = require("express");
const { Index } = require("../controllers/UsersController");
const Authorize = require("../middlewares/Authorize");

const router = Router();

router.get("/", Authorize.check, Index);

module.exports = router;
