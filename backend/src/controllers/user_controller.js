import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt_token.js';
import { getNextCustomUserId } from '../utils/getNextId.js';

// Register user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; // Validating email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Regex for password validation:
    // - One letter
    // - One number
    // - One special character (t.ex. @, $, !, %, etc.)
    // - Min 8 characters long
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, and include at least one letter, one number, and one special character' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const nextId = await getNextCustomUserId();
        const newUser = new User({
            user_id: nextId,
            username,
            email,
            passwordHash: hashedPassword,
            likedProducts: [],
            orderHistory: []
        });
        await newUser.save();
        res.status(201).json({ 
            message: 'User registered successfully', 
            token: generateToken(newUser._id, newUser.user_id, newUser.email, newUser.isAdmin), // Generate JWT token and include username and email
            user: {
                username: newUser.username,
                email: newUser.email
            } 
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ 
            message: 'Login successful', 
            token: generateToken(user._id, user.user_id, user.email, user.isAdmin),
            user: {
                username: user.username,
                email: user.email
            }  
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (req.user.user_id !== id) {
        return res.status(403).json({ message: 'Access denied: You can only update your own profile' });
    }

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; // Validating email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Regex for password validation:
    // - One letter
    // - One number
    // - One special character (t.ex. @, $, !, %, etc.)
    // - Min 8 characters long
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, and include at least one letter, one number, and one special character' });
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

// Get user by ID
const getUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.user_id !== id) {
        return res.status(403).json({ message: 'Access denied: You can only update your own profile' });
    }
    
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

// Get current user from token
const getCurrentUser = async (req, res) => {
    try {
        // user_id is included in the token and extracted by the verifyToken middleware
        const userId = req.user.user_id;
        
        const user = await User.findOne({ user_id: userId }).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { registerUser, loginUser, updateUser, getUser, getCurrentUser };
