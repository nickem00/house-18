import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: { type: String, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema, 'Users');
