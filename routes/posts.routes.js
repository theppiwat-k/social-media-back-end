const { getStatusController } = require('../controllers/posts/get');
const { postStatusController } = require('../controllers/posts/save');

const express = require('express');
const router = express.Router();

router.get('/status', getStatusController);
router.post('/status', postStatusController);
// router.post("/story", postController.story);

module.exports = router;
