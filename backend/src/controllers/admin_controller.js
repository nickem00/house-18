import User from '../models/user.js';
import Order from '../models/order.js';
import Product from '../models/product.js';

export const getStats = async (req, res) => {
  // Check if the user is an admin
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Only admin has access' });
  }

  try {
    const userCount = await User.countDocuments();
    const orders = await Order.find();

    let totalRevenue = 0;
    const productSales = {};

    for (const order of orders) {
      for (const item of order.items) {
        const productId = item.product.toString();
        const quantity = item.quantity;

        // Get product data from the database
        const product = await Product.findById(productId);
        if (!product) continue;

        const price = product.price;
        const name = product.name;

        totalRevenue += price * quantity;

        if (!productSales[productId]) {
          productSales[productId] = {
            name,
            quantity: 0
          };
        }

        productSales[productId].quantity += quantity;
      }
    }

    // Find top product by quantity sold

    let topProductName = 'No data available';
    let maxQuantity = 0;

    for (const { name, quantity } of Object.values(productSales)) {
      if (quantity > maxQuantity) {
        maxQuantity = quantity;
        topProductName = name;
      }
    }

    res.status(200).json({
      userCount,
      totalRevenue,
      topProduct: topProductName
    });

  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

