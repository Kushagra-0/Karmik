const express = require('express');
const userController = require("../controllers/userController")
const router = express.Router();

router.put('/update-name/:userId', userController.updateUserName);

module.exports = router;