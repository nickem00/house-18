import express from 'express';
import { registerUser, loginUser, updateUser, getUser  } from '../controllers/user_controller.js';

const router = express.Router();

router.post('/api/users/register', registerUser);
router.post('/api/users/login', loginUser);
router.put('/api/users/:id', updateUser);
router.get('/api/users/:id', getUser);

export default router;
