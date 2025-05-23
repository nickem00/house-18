import '../styles/ProfilePage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../features/ProfilePage/fetchUserInfo";
import { isAdmin } from "../features/isAdmin";
import { logout } from "../features/logout";
import UserInfo from "../components/ProfilePage/UserInfo";
import LikedProducts from "../components/ProfilePage/LikedProducts";
import OrderHistory from "../components/ProfilePage/OrderHistory";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [removingProductId, setRemovingProductId] = useState(null);
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

    // Function to fetch user data and check if the user is logged in.
    // Uses UseState to render the data.
    const loadUserData = async () => {
        setLoading(true);
        const result = await fetchUserInfo();
        
        if (result.error) {
            setError(result.error);
            if (result.error === "User is not logged in") {
                navigate("/login-register");
            }
        } else {
            setUserData(result.user);
            // Check if user is admin
            setUserIsAdmin(isAdmin());
        }
        setLoading(false);    
    };
    
    // Effect to load user data when the component loads
    // and when the navigate function changes.
    useEffect(() => {
        loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    
    // If loading, return a loading message.
    // If there is an error, return an error message.
    if (loading) return <div className="profile-page-container">Loading user information...</div>;
    if (error) return <div className="profile-page-container">Error: {error}</div>;
    
    const handleLogout = () => {
        logout(navigate);
    };
    
    // Function for unliking a product
    // Removes the product from the likedProducts in the database
    const unlikeProduct = async (productId) => {
        try {
            setRemovingProductId(productId);
            const token = localStorage.getItem('token');
            if (!token) {
                setError("You must be logged in to unlike a product");
                setRemovingProductId(null);
                return;
            }
              const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";
            const response = await fetch(`${URL}/api/favorites/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to unlike product");
            }
            
            // Refresh user data to update the liked products list
            await loadUserData();
        } catch (error) {
            console.error("Error unliking product:", error);
            setError(error.message);
        } finally {
            setRemovingProductId(null);
        }
    };
    
    // The actual profile page component
    // Imports components from components/ProfilePage
    return (
        <div className="profile-page-container">
            <h1>Your Profile</h1>
            <div className="profile-content">
                <UserInfo 
                    userData={userData} 
                    userIsAdmin={userIsAdmin} 
                    handleLogout={handleLogout}
                />
                
                <LikedProducts 
                    likedProducts={userData?.likedProducts || []} 
                    removingProductId={removingProductId}
                    unlikeProduct={unlikeProduct}
                />

                <OrderHistory
                    orders={userData?.orderHistory || []}
                />
            </div>
        </div>
    );
}