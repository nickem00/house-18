import jwt from 'jsonwebtoken';

const generateToken = (id, userId, email, isAdmin) => {
    return jwt.sign({ 
        id: id,
        user_id: userId,
        email: email,
        isAdmin: isAdmin
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' });
};

// Middleware to verify JWT token
// This middleware checks if the token is valid and if so, it adds the decoded user information to the request object
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ 
            message: 'Invalid token.',
            error: error.message
        });
    }
};


export { generateToken, verifyToken };
