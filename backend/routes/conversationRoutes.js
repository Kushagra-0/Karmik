const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController')

router.post('/', conversationController.createConversation);
router.get('/:userId', conversationController.getConversation);

module.exports = router;