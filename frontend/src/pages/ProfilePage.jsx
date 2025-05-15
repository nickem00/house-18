import '../styles/ProfilePage.css';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchUserInfo } from "../features/ProfilePage/fetchUserInfo";
import { isAdmin } from "../features/isAdmin";
import { logout } from "../features/logout";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true);
            const result = await fetchUserInfo();
            
            if (result.error) {
                setError(result.error);
                if (result.error === "User is not logged in") {
                    navigate("/Login-Register");
                }
            } else {
                setUserData(result.user);
                // Check if user is admin
                setUserIsAdmin(isAdmin());
            }
            setLoading(false);
        };

        loadUserData();
    }, [navigate]);    if (loading) return <div className="profile-page-container">Loading user information...</div>;
    if (error) return <div className="profile-page-container">Error: {error}</div>;

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div className="profile-page-container">
            <h1>Your Profile</h1>
            <div className="profile-content">
                
                <div className="profile-summary-button-container">
                    <div className="profile-summary">
                        <h2>Your info:</h2>
                        {userData && (
                            <div className="user-info">
                                <p><strong>Username:</strong> {userData.username}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>User ID:</strong> {userData.user_id}</p>
                            </div>
                        )}
                    </div>
                    <div className="profile-buttons">
                        {userIsAdmin && (
                            <Link to="/admin" className="profile-admin-dashboard-btn">Admin Dashboard</Link>
                        )}
                        <button onClick={handleLogout} className="profile-logout-btn">Log Out</button>
                    </div>
                </div>
                  <div className='profile-liked-products'>
                    <h2>Liked Products:</h2>
                    {userData && userData.likedProducts && userData.likedProducts.length > 0 ? (
                        <ul className="liked-products-grid">
                            {userData.likedProducts.map((product) => (                                
                                <li key={product.product_id} className="liked-product-card">
                                    <Link to={`/products/${product.product_id}`} className="liked-product-link">
                                        <div className="liked-product-image">
                                            {product.images && product.images.length > 0 ? (
                                                <img src={product.images[0]} alt={product.name} />
                                            ) : (
                                                <div className="no-image">No Image</div>
                                            )}
                                        </div>
                                        <div className="liked-product-info">
                                            <p className="liked-product-name"><strong>{product.name}</strong></p>
                                            <p className="liked-product-price">{product.price} kr</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No liked products found.</p>
                    )}
                </div>

                <div className='profile-orders'>
                    <h2>Your Orders:</h2>
                    {userData && userData.orderHistory && userData.orderHistory.length > 0 ? (
                        <ul className='order-cards-list'>
                            {userData.orderHistory.map((order) => (
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
            </div>
        </div>
    );
}