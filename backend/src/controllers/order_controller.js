import Order from '../models/order.js';
import User from '../models/user.js';
import Product from '../models/product.js';
import { checkStock, decrementStock } from '../utils/stock.js';

const createOrder = async (req, res) => {
    const { user_id, products, status } = req.body;


    if (!user_id || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (typeof products !== 'object' || !Array.isArray(products)) {
        return res.status(400).json({ message: 'Products should be an array' });
    }
    if (products.length === 0) {
        return res.status(400).json({ message: 'Products array cannot be empty' });
    }
    if (typeof user_id !== 'string' || user_id.trim() === '') {
        return res.status(400).json({ message: 'User ID should be a non-empty string' });
    }
    if (products.some(item =>
        !item ||
        typeof item.product_id !== 'string' || !item.product_id.trim() ||
        typeof item.size      !== 'string' || !item.size.trim() ||
        typeof item.quantity  !== 'number' || item.quantity <= 0
    )) {
        return res.status(400).json({
        message: 'Each product must be an object with non-empty product_id (string), size (string) and quantity (number>0)'
        });
    }
  

    try {
        for (const product of products) {
            const inStock = await checkStock(product.product_id, product.quantity, product.size);
            if (!inStock) {
                return res.status(400).json({ message: 'Product is out of stock' });
            }
        }
    
        let total = 0;
    
        const mappedItems = await Promise.all(products.map(async ({ product_id, size, quantity }) => {
            const p = await Product.findOne({ product_id });
            if (!p) {
                return res.status(404).json({ message: `Product ${product_id} not found` });
            }
            total += p.price * quantity;
    
            return {
                product: p._id,
                size,
                quantity
            };
        }));
    
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        const newOrder = new Order({
            user_id: user._id,
            items: mappedItems,
            total: total,
            status: status || 'pending',
            createdAt: new Date()
        });
    
        await newOrder.save();
    
        for (const { product_id, size, quantity } of products) {
            await decrementStock(product_id, size, quantity);
        }
    
        return res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }    
};

const getAllOrders = async (req, res) => {};

const getOrderByCustomerID = async (req, res) => {};

const updateOrderStatus = async (req, res) => {};

export { createOrder, getAllOrders, getOrderByCustomerID, updateOrderStatus };
