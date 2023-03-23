const express = require('express');
const router = express.Router();

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
const {
    updateUserProfileController,
} = require('../controllers/users/updateProfile');

const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, '../temp') });

router.post('/register', registerController);
router.post('/login', validateRegister, loginController);
router.post('/logout', logoutController);
router.post('/user-profile', userProfileController);
router.get('/authorization', getTokenController);
router.get('/activated', activatedUserController);
router.post('/update-profile',upload.single('avatar'),updateUserProfileController);

module.exports = router;
