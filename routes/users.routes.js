const usersController = require("../controllers/user.controller.js");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.post("/user-profile", usersController.userProfile);
router.get("/authorization", usersController.authenticateToken);

module.exports = router;