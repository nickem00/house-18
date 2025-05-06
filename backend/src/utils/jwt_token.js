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
        // Lägg till detaljerad felinformation för att hjälpa felsökning
        return res.status(400).json({ 
            message: 'Invalid token.',
            error: error.message  // Visa specifika felmeddelanden från jwt-verifieringen
        });
    }
};


export { generateToken, verifyToken };
