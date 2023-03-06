const registerController = require("../controllers/users/register");
const loginController = require("../controllers/users/login");
const logoutController = require("../controllers/users/logout");
const userProfileController = require("../controllers/users/userProfile");
const authenticateTokenController = require("../controllers/users/authenticateToken");
const validateRegister = require("../utils/validateRegister");

const express = require("express");
const router = express.Router();

router.post("/register", registerController.register);
router.post("/login",validateRegister, loginController.login);
router.post("/logout", logoutController.logout);
router.post("/user-profile", userProfileController.userProfile);
router.get("/authorization", authenticateTokenController.getToken);

module.exports = router;