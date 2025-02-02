const Chat = require('../model/Chat');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, eventId, message } = req.body;

    const chatMessage = new Chat({
      senderId,
      receiverId,
      eventId,
      message
    });

    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    const messages = await Chat.find({
      eventId,
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
