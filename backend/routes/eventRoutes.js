const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.get('/user/:userId', eventController.getUserEvents);
router.get('/event/:eventId', eventController.getEvent);
router.get('/', eventController.getAllEvents);

router.post('/create', eventController.createEvent);

router.delete('/event/:eventId', eventController.deleteEvent)
module.exports = router;
