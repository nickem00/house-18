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
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Token expired.' });
    }
    return res
      .status(401)
      .json({
        message: 'Invalid token.',
        error: error.message
      });
  }
};



export { generateToken, verifyToken };
