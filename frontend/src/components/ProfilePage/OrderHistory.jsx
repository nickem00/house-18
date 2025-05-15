import React from 'react';
import '../../styles/ProfilePage.css';

export default function OrderHistory({ orders }) {
    return (
        <div className='profile-orders'>
            <h2>Your Orders:</h2>
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
                <p>No orders found.</p>
            )}
        </div>
    );
}
