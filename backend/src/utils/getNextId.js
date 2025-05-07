import Product from '../models/product.js';

export async function getNextCustomProductId() {
    const last = await Product
        .findOne({ product_id: /^P\d{3}$/ })
        .sort({ product_id: -1 })
        .lean();

    let nextNum = 1;
    if (last) {
        nextNum = parseInt(last.product_id.slice(1), 10) + 1;
    }

    return 'P' + nextNum.toString().padStart(3, '0');
}
