import express from 'express';
import { getStats } from '../controllers/admin_controller.js';
import { verifyToken } from '../utils/jwt_token.js';

const router = express.Router();

router.get('/api/admin/stats', verifyToken, getStats);

export default router;

