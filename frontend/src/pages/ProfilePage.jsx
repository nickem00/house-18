import '../styles/ProfilePage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../features/ProfilePage/fetchUserInfo";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            }
            setLoading(false);
        };

        loadUserData();
    }, [navigate]);

    if (loading) return <div className="profile-page-container">Loading user information...</div>;
    if (error) return <div className="profile-page-container">Error: {error}</div>;

    return (
        <div className="profile-page-container">
            <h1>Your Profile</h1>
            <div className="profile-content">
                
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

                <div className='profile-liked-products'>
                    <h2>Liked Products:</h2>
                    {userData && userData.likedProducts && userData.likedProducts.length > 0 ? (
                        <ul>
                            {userData.liked_products.map((product) => (
                                <li key={product.id}>
                                    <p><strong>{product.name}</strong></p>
                                    <p>{product.description}</p>
                                    <p>Price: ${product.price}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No liked products found.</p>
                    )}
                </div>
                <div className='profile-orders'>
                    <h2>Your Orders:</h2>
                    {userData && userData.orders && userData.orders.length > 0 ? (
                        <ul>
                            {userData.orders.map((order) => (
                                <li key={order.id}>
                                    <p><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>Total Price:</strong> ${order.total_price}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
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