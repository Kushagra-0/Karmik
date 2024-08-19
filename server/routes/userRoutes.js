const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Get user profile
router.get('/:userId', userController.getUserProfile);

// Update user profile
router.put('/:userId', userController.updateUserProfile);

module.exports = router;