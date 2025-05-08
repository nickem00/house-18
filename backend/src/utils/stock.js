import Product from '../models/product.js';

// Check stock for a specific product and size if the product is out of stock
export const checkStock = async (product_id, quantity, size) => {
    const product = await Product.findOne({ product_id: product_id });
    if (!product) {
        throw new Error('Product not found');
    }

    const variant = product.variants.find(v => v.size === size);
    if (!variant) {
        return false; // Size not found
    }

    if (variant.stock < quantity) {
        return false; // Not enough stock
    }

    return true;
};

// Decrement stock for a specific product and size
export async function decrementStock(productId, size, quantity) {
    const product = await Product.findOne({ product_id: productId });
    if (!product) {
        throw new Error(`Product ${productId} not found`);
    }
  
    const variant = product.variants.find(v => v.size === size);
    if (!variant) {
        return(`Size ${size} not found for product ${productId}`);
    }
  
    if (variant.stock < quantity) {
        throw new Error(
            `Cannot decrement stock: only ${variant.stock} left for ${productId} size ${size}`
        );
    }
  
    variant.stock -= quantity;
    await product.save();
}
