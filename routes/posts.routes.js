const express = require('express');
const router = express.Router();

const { getStatusController } = require('../controllers/posts/get');
const { postStatusController } = require('../controllers/posts/save');

router.get('/status', getStatusController);
router.post('/status', postStatusController);
// router.post("/story", postController.story);

module.exports = router;
