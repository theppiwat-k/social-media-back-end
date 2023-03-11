const { registerController } = require('../controllers/users/register');
const { loginController } = require('../controllers/users/login');
const { logoutController } = require('../controllers/users/logout');
const { userProfileController } = require('../controllers/users/userProfile');
const {
  getTokenController,
} = require('../controllers/users/authenticateToken');
const {
  activatedUserController,
} = require('../controllers/users/activatedUser');

const validateRegister = require('../middlewares/validateRegister');

const express = require('express');
const router = express.Router();

router.post('/register', registerController);
router.post('/login', validateRegister, loginController);
router.post('/logout', logoutController);
router.post('/user-profile', userProfileController);
router.get('/authorization', getTokenController);
router.get('/activated', activatedUserController);

module.exports = router;
