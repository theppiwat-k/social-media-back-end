const express = require('express');
const router = express.Router();

const { friendRequestController } = require('../controllers/requests/friendRequest');

router.post('/newfirendrequest', friendRequestController);

module.exports = router;
