const express = require("express");

const users = require("./users");
const auth = require("./auth");
const subscribers = require("./subscribers");

const router = express.Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/subscribers", subscribers);

module.exports = router;
