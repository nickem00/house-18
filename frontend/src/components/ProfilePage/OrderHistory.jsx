import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/ProfilePage.css';
import '../../features/icons';

// Component for the Order History section of the profile page.
// Displays a list of orders made by the user.
export default function OrderHistory({ orders }) {
    return (
        <div className='profile-orders'>
            <h2>Your Orders:</h2>
            {/* If orders are found, return this */}
            {orders && orders.length > 0 ? (
                <ul className='order-cards-list'>
                    {orders.map((order) => (
                        <li key={order.order_id} className='order-card'>                                    
                            <p><strong>Order ID:</strong> {order.order_id}</p>
                            <p><strong>Total Price:</strong> {order.total} kr</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <div className="order-items">
                                <p><strong>Items:</strong></p>
                                <ul>
                                    {order.items.map((item, index) => {
                                        // Check if the product exists
                                        const productExists = item.product && item.product.name;
                                        
                                        return (
                                            <li key={index} className={`order-item ${!productExists ? 'order-item-unavailable' : ''}`}>
                                                {productExists ? (
                                                    <p>{item.product.name} - Size: {item.size}, Qty: {item.quantity}</p>
                                                ) : (
                                                    <p className="unavailable-product-text">
                                                        <FontAwesomeIcon icon="exclamation-triangle" className="unavailable-icon" />
                                                        Product no longer available - Size: {item.size}, Qty: {item.quantity}
                                                    </p>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                // If no orders are found, display a message
                <p>No orders found.</p>
            )}
        </div>
    );
}
