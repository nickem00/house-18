import express from 'express';
import { createMessage, getAllMessages, getMessageByEmail } from '../controllers/messages_controller.js';
import { verifyToken } from '../utils/jwt_token.js';

const router = express.Router();

router.post('/api/message', createMessage);
router.get('/api/messages', verifyToken, getAllMessages);
router.get('/api/message/:email', verifyToken, getMessageByEmail);

export default router;
