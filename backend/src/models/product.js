import moongoose from 'mongoose';

const productSchema = new moongoose.Schema({
    name: { type: String, required: true, trim: true},
    description: { type: String, required: true, trim: true},
    price: { type: Number, required: true },
    color: { type: String, required: true},
    category: { type: String, required: true},
    variants: [{ 
        size: { type: String, required: true},
        stock: { type: Number, required: true}
    }],
    images: [{ type: String, required: true}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default moongoose.model('Product', productSchema);