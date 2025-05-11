import express from 'express';
import { createOrder, getAllOrders, getOrderByUserID, updateOrderStatus } from '../controllers/order_controller.js';
import { verifyToken } from '../utils/jwt_token.js';

const router = express.Router();

router.post('/api/orders', verifyToken, createOrder);
router.get('/api/orders', verifyToken, getAllOrders);
router.get('/api/orders/:id', verifyToken, getOrderByUserID);
router.put('/api/orders/:id/:status', verifyToken, updateOrderStatus); // Update order status, Statud must be one of: pending, shipped, delivered, cancelled

export default router;
