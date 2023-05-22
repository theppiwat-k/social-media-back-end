const express = require('express');
const router = express.Router();

const { commentPostController } = require('../controllers/posts/commentPost');
const { getPostController } = require('../controllers/posts/getPost');
const { likePostController } = require('../controllers/posts/likePost');
const { postStatusController } = require('../controllers/posts/savePost');
const { deletePostController } = require('../controllers/posts/deletePost');
const {
    getCommentByOneController,
} = require('../controllers/posts/getCommentByOne');
const { editPostController } = require('../controllers/posts/editPost');

router.post('/getstatus', getPostController);
router.get('/getcommentbyone/:id', getCommentByOneController);
router.post('/status', postStatusController);
router.post('/comment', commentPostController);
router.post('/like', likePostController);
router.post('/edit', editPostController);
router.delete('/delete/:id', deletePostController);
// router.post("/story", postController.story);

module.exports = router;
