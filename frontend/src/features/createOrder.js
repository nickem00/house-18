const baseAPIUrl = import.meta.env.VITE_API_BASE_URL;

export async function createOrder(cartItems, shippingCost) {
    const token = localStorage.getItem("token");

    if (!token) {
        return { error: "User is not logged in" };
    }

    const products = cartItems.map(item => ({
        product_id: item.product_id,
        size: item.size,
        quantity: item.quantity,
    }));

    try {
        const res = await fetch(`${baseAPIUrl}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ products, shippingCost })
        });

        const data = await res.json();

        if (!res.ok) {
            return { error: data.message || "Something went wrong"}    
        }

        return { success: true, data}

    } catch (error) {
        console.error("Error placing order:", error);
        return { error: "Server error"}
    }
}