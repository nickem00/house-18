import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProfilePage.css';

export default function UserInfo({ userData, userIsAdmin, handleLogout }) {
    return (
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
    );
}
