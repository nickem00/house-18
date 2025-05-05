import User from '../models/user.js';
import bcrypt from 'bcryptjs';


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const uCount = await User.countDocuments();
        const customId = 'U' + (uCount + 1).toString().padStart(3, '0');
        const newUser = new User({
            user_id: customId,
            username,
            email,
            passwordHash: hashedPassword,
            likedProducts: [],
            orderHistory: []
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const user = await User.findOne({ user_id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = username;
        user.email = email;
        user.passwordHash = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ user_id: id }).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { registerUser, loginUser, updateUser, getUser  };
