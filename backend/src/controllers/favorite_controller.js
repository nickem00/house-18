import User from "../models/user.js";
import Product from "../models/product.js";


// Add favourite
const addFavorite = async (req, res) => {
    const userId = req.user.user_id;
    const productId = req.params.productId;

    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // First, find the product by product_id to get its MongoDB ObjectId
        const product = await Product.findOne({ product_id: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if product is already in favorites
        if (user.likedProducts.some(id => id.toString() === product._id.toString())) {
            return res.status(400).json({ message: "Product already in favorites" });
        }

        user.likedProducts.push(product._id);
        await user.save();

        res.status(200).json({ message: "Product added to favorites", likedProducts: user.likedProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Remove favourite
const removeFavorite = async (req, res) => {
    const userId = req.user.user_id;
    const productId = req.params.productId;
         
    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // First, find the product by product_id to get its MongoDB ObjectId
        const product = await Product.findOne({ product_id: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        user.likedProducts = user.likedProducts.filter(id => id.toString() !== product._id.toString());
        await user.save();

        res.status(200).json({ message: "Product removed from favorites", likedProducts: user.likedProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Get all favourites
const getFavorites = async (req, res) => {
    const userId = req.user.user_id;

    try {
        const user = await User.findOne({ user_id: userId })
            .populate({
                path: 'likedProducts',
                select: 'product_id name description price images'
            });
            
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ likedProducts: user.likedProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Check if product is in favorites
const checkFavorite = async (req, res) => {
    const userId = req.user.user_id;
    const productId = req.params.productId;

    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the product by product_id
        const product = await Product.findOne({ product_id: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the product is in the user's favorites
        const isFavorite = user.likedProducts.some(id => id.toString() === product._id.toString());
        
        res.status(200).json({ isFavorite });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { addFavorite, removeFavorite, getFavorites, checkFavorite };
