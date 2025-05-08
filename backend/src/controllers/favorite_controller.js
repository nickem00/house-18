import User from "../models/user_model.js";


// Add favourite
const addFavorite = async (req, res) => {
    const userId = req.user.user_id;
    const productId = req.params.productId;

    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.likedProducts.includes(productId)) {
            return res.status(400).json({ message: "Product already in favorites" });
        }

        user.likedProducts.push(productId);
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
    
            user.likedProducts = user.likedProducts.filter(id => id !== (productId));
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
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ likedProducts: user.likedProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { addFavorite, removeFavorite, getFavorites };
