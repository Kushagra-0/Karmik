const mongoose = require('mongoose');
const Message = require('../model/Message')

const addMessage = async(req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch(err) {
        res.status(500).json(err);
    }
}

const getMessage = async(req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    addMessage,
    getMessage,
};