export default function getCategoryCount(products) {
    const counts = {};
    for (const product of products) {
        const category = product.category;
        counts[category] = (counts[category] || 0) + 1;
    }
    return counts;
}