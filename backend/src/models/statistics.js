import mongoose from 'mongoose';
import order from './order';

const statisticsSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    totalUsers: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    topProducts: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        name: { type: String, reqired: true, trim: true },
        sold: { type: Number, default: 0 }
    }],

});

export default mongoose.model('Statistics', statisticsSchema);

