import Order from '../models/order.js';
import User from '../models/user.js';
import { checkStock, decrementStock } from '../utils/stock.js';

const createOrder = async (req, res) => {
    const { user_id, products } = req.body;

    // Products should be an array of objects with product_id, quantity, and size

    if (!user_id || !products) {
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
    // Ta bort den gamla string–checken och lägg in:
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
        products.forEach(product => {
            let inStock = checkStock(product.product_id, products.quantity, products.size)
            if (!inStock) {
                return res.status(400).json({ message: 'Product is out of stock' });
            }
        });

        const user = await User.findOne({ user_id: user_id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = new Order({
            user_id,
            items: products,
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
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllOrders = async (req, res) => {};

const getOrderByCustomerID = async (req, res) => {};

const updateOrderStatus = async (req, res) => {};

export { createOrder, getAllOrders, getOrderByCustomerID, updateOrderStatus };
