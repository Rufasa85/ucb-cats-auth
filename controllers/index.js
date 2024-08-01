const express = require("express");
const router = express.Router();

const catRoutes = require("./catRoutes");
router.use("/api/cats", catRoutes);

const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

module.exports = router;
