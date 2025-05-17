import Order from '../models/order.js';
import User from '../models/user.js';
import Product from '../models/product.js';
import { checkStock, decrementStock } from '../utils/stock.js';
import { getNextCustomOrderId } from '../utils/getNextId.js';

// Create a new order
const createOrder = async (req, res) => {
    let { products, shippingCost = 0, status } = req.body;
    const user_id = req.user.user_id;

    shippingCost = Number(shippingCost);

    if (isNaN(shippingCost) || shippingCost < 0) {
        return res.status(400).json({ message: 'Shipping cost should be a non-negative number' });
    }
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Products array cannot be empty' });
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
    
        // Count total price
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

        // Add shipping cost to total
        total += shippingCost;
    
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const nextId = await getNextCustomOrderId();
        const newOrder = new Order({
            order_id: nextId,
            user_id: user._id,
            items: mappedItems,
            shippingCost,
            total: total,
            status: status || 'pending',
            createdAt: new Date()
        });        await newOrder.save();
    
        // Update the user's order history
        user.orderHistory.push(newOrder._id);
        await user.save();
    
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

// Get all orders
const getAllOrders = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const orders = await Order.find()
            .populate('user_id', 'name email')
            .populate('items.product', 'name price');
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get orders by user ID
const getOrderByUserID = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }
  
    if (!req.user.isAdmin && req.user.user_id !== id) { // Check if the user is not an admin and is not the same as the user ID in the request
        return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
        const user = await User.findOne({ user_id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
      const orders = await Order
        .find({ user_id: user._id })
        .populate('user_id', 'name email')
        .populate('items.product', 'name price');
  
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this User' });
        }
        return res.status(200).json(orders);
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};
  
// Update order status
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.params;

    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const order = await Order.findOne({ order_id: id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (!['pending', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        order.status = status;
        order.updatedAt = new Date();
        await order.save();

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    try {
        const order = await Order.findOne({ order_id: id })
            .populate('user_id', 'username email user_id')
            .populate('items.product', 'name price images');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (!req.user.isAdmin && req.user.user_id !== order.user_id.user_id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export { createOrder, getAllOrders, getOrderByUserID, updateOrderStatus, getOrderById };
