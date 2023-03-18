const express = require('express');
const router = express.Router();

const { sendRequestController, getNewFriendRequestController } = require('../controllers/requests/friendRequest');
const { accecptFriendRequestController } = require('../controllers/requests/accecptFriendRequest');
const { rejectFriendRequestController } = require('../controllers/requests/rejectFriendRequest');

router.post('/newfriendrequest', sendRequestController);
router.put('/accecptnewfriend', accecptFriendRequestController);
router.put('/rejectnewfriend', rejectFriendRequestController);
router.get('/getnewfriendrequest', getNewFriendRequestController);

module.exports = router;
