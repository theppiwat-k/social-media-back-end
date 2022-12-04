const postController = require("../controllers/post.controller.js");

const express = require("express");
const router = express.Router();

router.post("/status", postController.status);
router.get("/status", postController.getStatus);
// router.post("/story", postController.story);

module.exports = router;
