export default function getCategoryCount(products) {
    //Empty object to track category counts
    const counts = {};

    //Loop through each product and count by category
    for (const product of products) {
        const category = product.category;
        
        //If increment or initialize if category does not exist
        counts[category] = (counts[category] || 0) + 1;
    }
    return counts;
}