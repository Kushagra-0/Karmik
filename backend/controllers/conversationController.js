const mongoose = require('mongoose');
const Conversation = require('../model/Conversation')

const createConversation = async(req, res) => {
    const { senderId, receiverId } = req.body;

    // Check if a conversation already exists between these two users
    const existingConversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
        return res.status(200).json(existingConversation); // Return existing conversation
    }

    const newConversation = new Conversation({
        members:[req.body.senderId, req.body.receiverId],
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch(err) {
        res.status(500).json(err);
    }
}

const getConversation = async(req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in:[req.params.userId]},
        })
        res.status(200).json(conversation);
    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createConversation,
    getConversation,
};