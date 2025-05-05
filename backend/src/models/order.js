import mongoose from 'mongoose';

const orderSchema = new moongoose.Schema({
    userID: { type: moongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: moongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    total: { type: Number, required: true },
    status: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

export default moongoose.model('Order', orderSchema);
