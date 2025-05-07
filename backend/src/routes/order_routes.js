import express from 'express';
import { createOrder, getAllOrders, getOrderByCustomerID, updateOrderStatus } from '../controllers/order_controller.js';
import { verifyToken } from '../utils/jwt_token.js';

const router = express.Router();

router.post('/api/orders', createOrder);
router.get('/api/orders', verifyToken, getAllOrders);
router.get('/api/orders/:id', verifyToken, getOrderByCustomerID);
router.put('/api/orders/:id/status', verifyToken, updateOrderStatus);

export default router;
