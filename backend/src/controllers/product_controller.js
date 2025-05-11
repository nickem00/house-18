import Product from '../models/product.js';
import { getNextCustomProductId } from '../utils/getNextId.js';

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ product_id: id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { name, price, description, color, category, variants, images } = req.body;
  
    if (!req.user.isAdmin) { // Check if the user is an admin
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!name || price == null || !description || !color || !category) {
        return res.status(400).json({
            message: 'Fälten name, price, description, color och category är obligatoriska'
        });
    }
    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: 'Price must be a number ≥ 0' });
    }
    if (!Array.isArray(variants) || !variants.length) {
        return res.status(400).json({ message: 'Variants måste vara en icke-tom array' });
    }
    if (!Array.isArray(images)) {
        return res.status(400).json({ message: 'Images måste vara en array' });
    }
    if (variants.some(v => !v.size || typeof v.stock !== 'number')) {
        return res.status(400).json({
            message: 'Varje variant måste ha size (string) och stock (number)'
        });
    }
  
    try {
        const nextId = await getNextCustomProductId();
        const newProduct = new Product({
            product_id: nextId,
            name,
            price,
            description,
            color,
            category,
            variants,
            images
        });
  
        await newProduct.save();
        return res.status(201).json(newProduct);
  
    } catch (error) {
        console.error('Error in createProduct:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message,
                details: Object.values(error.errors).map(e => e.message)
            });
        }
        return res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
};
  
// Update a product by ID
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const allowed = (({ name, price, description, color, category, variants, images }) =>
        ({ name, price, description, color, category, variants, images }))(req.body);
  
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
        const product = await Product.findOneAndUpdate(
            { product_id: productId },
            { ...allowed, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
  
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
  
    } catch (error) {
        console.error('Error in updateProduct:', error);
        if (error.name === 'ValidationError') {
        return res.status(400).json({
                message: error.message,
                details: Object.values(error.errors).map(e => e.message)
            });
        }
        return res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};
  
// Delete a product by ID
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
  
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
        const product = await Product.findOneAndDelete({ product_id: productId });
  
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
  
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        return res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
