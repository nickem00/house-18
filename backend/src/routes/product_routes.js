import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product_controller.js';
import { verifyToken } from '../utils/jwt_token.js';

const router = express.Router();

router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProductById);
router.post('/api/products', verifyToken, createProduct);
router.put('/api/products/:id', verifyToken, updateProduct);
router.delete('/api/products/:id', verifyToken, deleteProduct);

export default router;
