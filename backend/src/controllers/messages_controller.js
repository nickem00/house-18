import Message from '../models/message.js';

// Create a new message
const createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; // Validating email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create message' });
    }
};

const getAllMessages = async (req, res) => {};

const getMessageByEmail = async (req, res) => {};

export { createMessage, getAllMessages, getMessageByEmail };
