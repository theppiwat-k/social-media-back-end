const express = require('express');
const router = express.Router();

const { friendRequestController } = require('../controllers/requests/friendRequest');
const { accecptFriendRequestController } = require('../controllers/requests/accecptFriendRequest');
const { rejectFriendRequestController } = require('../controllers/requests/rejectFriendRequest');

router.post('/newfriendrequest', friendRequestController);
router.put('/accecptnewfriend', accecptFriendRequestController);
router.put('/rejectnewfriend', rejectFriendRequestController);

module.exports = router;
