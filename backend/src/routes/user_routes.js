import express from 'express';
import { registerUser, loginUser, updateUser, getUser, getCurrentUser } from '../controllers/user_controller.js';
import { verifyToken } from '../utils/jwt_token.js';

const router = express.Router();

router.post('/api/users/register', registerUser);
router.post('/api/users/login', loginUser);
router.put('/api/users/:id', verifyToken, updateUser);
router.get('/api/users/:id', verifyToken, getUser);
router.get('/api/users', verifyToken, getCurrentUser); // New route to get current user info from token

export default router;
