import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

// The page compontent for the order confirmation page
// This page is displayed after a successful order placement.
export default function OrderConfirmation() {
    const { id } = useParams();
    const location = useLocation();

    // State variables to manage order details, loading state, and error state
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Get address information from router state
    const addressInfo = location.state?.address || {};

    // Effect to fetch order details when the component mounts.
    // Fetches order details from the API using the order ID.
    // --
    // Uses shipping address from the navigation state, as it 
    // is not stored in the database.
    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                const baseAPIUrl = import.meta.env.VITE_API_BASE_URL;
                const token = localStorage.getItem("token");
                
                if (!token) {
                    throw new Error("User is not logged in");
                }
                
                const response = await fetch(`${baseAPIUrl}/api/orders/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch order details");
                }
                
                const data = await response.json();
                setOrder(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching order:", err);
                setError(err.message);
                setLoading(false);
            }
        }
        
        fetchOrderDetails();
    }, [id]);

    // Checks if the order is still loading, if there is an error,
    // or if the order is not found, and renders the appropriate message.
    if (loading) {
        return <div className="order-container"><h2>Loading order details...</h2></div>;
    }

    if (error) {
        return <div className="order-container"><h2>Error: {error}</h2></div>;
    }

    if (!order) {
        return <div className="order-container"><h2>Order not found</h2></div>;
    }

    // If all goes well, render the order confirmation page.
    return (
        <div className="order-container">
            <div className="order-content">
                <h1>Order Confirmation</h1>
                <div className="order-message">
                    <p>Thank you for your order! Your order has been placed successfully.</p>
                    <p>Order ID: <strong>{order.order_id}</strong></p>
                    <p>Status: <strong>{order.status}</strong></p>
                </div>

                <div className="order-flex-container">
                    <div className="order-shipping">
                        <div className="order-shipping-address">
                            <h2>Shipping Address</h2>
                            <div className="order-address-details">
                                <p><strong>{addressInfo.fullName}</strong></p>
                                <p>{addressInfo.email}</p>
                                <p>{addressInfo.address}</p>
                                <p>{addressInfo.city}, {addressInfo.postalCode}</p>
                                <p>{addressInfo.country}</p>
                                <p>Shipping Method: {addressInfo.shippingMethod === 'express' ? 'Express Shipping' : 'Standard Shipping'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        {/* If the order has items, drender this */}
                        {order.items && order.items.length > 0 ? (
                            <>
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="order-item-info">
                                            <p className="order-item-name">{item.product.name}</p>
                                            <div className="order-item-details">
                                                <span className="order-item-size">Size: {item.size}</span>
                                                <span className="order-item-quantity">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                        <p className="order-item-price">{item.product.price * item.quantity} kr</p>
                                    </div>
                                ))}
                            
                                <div className="order-summary-line">
                                    <p>Shipping</p>
                                    <p>{order.shippingCost} kr</p>
                                </div>
                                <div className="order-summary-total">
                                    <p>Total</p>
                                    <p>
                                        {order.total} kr
                                    </p>
                                </div>
                            </>
                        ) : (
                            // If no items are found, display a message
                            <p>No items in this order.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}