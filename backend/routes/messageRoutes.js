const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')

router.post("/", messageController.addMessage);
router.get("/:conversationId", messageController.getMessage);

module.exports = router;