import Product from '../models/product.js';

export const checkStock = async (product_id, quantity, size) => {
    const product = await Product.findOne({ product_id: product_id });
    if (!product) {
        throw new Error('Product not found');
    }

    const variant = product.variants.find(v => v.size === size);
    if (!variant) {
        throw new Error('Size not found in product variants');
    }

    if (variant.stock < quantity) {
        throw new Error('Insufficient stock for the requested size');
    }

    return true;
};

export async function decrementStock(productId, size, quantity) {
    const product = await Product.findOne({ product_id: productId });
    if (!product) {
        throw new Error(`Product ${productId} not found`);
    }
  
    const variant = product.variants.find(v => v.size === size);
    if (!variant) {
        throw new Error(`Size ${size} not found for product ${productId}`);
    }
  
    if (variant.stock < quantity) {
        throw new Error(
            `Cannot decrement stock: only ${variant.stock} left for ${productId} size ${size}`
        );
    }
  
    variant.stock -= quantity;
    // Spara ändringarna
    await product.save();
}
