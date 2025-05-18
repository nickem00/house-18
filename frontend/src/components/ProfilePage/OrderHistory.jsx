import React from 'react';
import '../../styles/ProfilePage.css';

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
                                    {order.items.map((item, index) => (
                                        <li key={index} className='order-item'>
                                            <p>{item.product.name} - Size: {item.size}, Qty: {item.quantity}</p>
                                        </li>
                                    ))}
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
