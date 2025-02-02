const mongoose = require('mongoose');
const Event = require('../model/Event');

const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, foodType, pickupInstructions, eventType, terms, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const newEvent = new Event({
      title,
      description,
      location,
      date,
      time,
      foodType,
      pickupInstructions,
      eventType,
      terms,
      userId
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createEvent,
};