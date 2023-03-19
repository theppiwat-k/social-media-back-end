const express = require('express');
const router = express.Router();

const { sendRequestController, getNewFriendRequestController } = require('../controllers/friends/friendRequest');
const { accecptFriendRequestController } = require('../controllers/friends/accecptFriendRequest');
const { rejectFriendRequestController } = require('../controllers/friends/rejectFriendRequest');
const { getSuggestFriendController } = require('../controllers/friends/suggestFriend');

router.post('/newfriendrequest', sendRequestController);
router.put('/accecptnewfriend', accecptFriendRequestController);
router.put('/rejectnewfriend', rejectFriendRequestController);
router.get('/getnewfriendrequest', getNewFriendRequestController);
router.get('/suggest-friend',getSuggestFriendController)

module.exports = router;
