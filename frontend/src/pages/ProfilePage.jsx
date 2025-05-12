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
            <div className="profile-content">
                <h1>Your Profile</h1>
                
                {userData && (
                    <div className="user-info">
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>User ID:</strong> {userData.user_id}</p>
                        
                        {userData.likedProducts && userData.likedProducts.length > 0 ? (
                            <div className="liked-products">
                                <h2>Favorite Products</h2>
                                <p>{userData.likedProducts.length} favorite products</p>
                            </div>
                        ) : (
                            <p>No favorite products yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}