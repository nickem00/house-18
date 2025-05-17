import express from 'express';
import { addFavorite, removeFavorite, getFavorites, checkFavorite } from '../controllers/favorite_controller.js';
import { verifyToken } from '../utils/jwt_token.js';

const router = express.Router();

router.post('/api/favorites/:productId', verifyToken, addFavorite);
router.delete('/api/favorites/:productId', verifyToken, removeFavorite);
router.get('/api/favorites', verifyToken, getFavorites);
router.get('/api/favorites/:productId', verifyToken, checkFavorite);

export default router;