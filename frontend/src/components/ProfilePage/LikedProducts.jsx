import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/ProfilePage.css';
import '../../features/icons';

// Components for displaying the user's liked products in the profile page.
// This component shows a list of products that the user has liked.
export default function LikedProducts({ likedProducts, removingProductId, unlikeProduct }) {
    return (
        <div id='#liked-products' className='profile-liked-products'>
            <h2>Liked Products:</h2>
            {/* If liked products are found, return this */}
            {likedProducts && likedProducts.length > 0 ? (
                <ul className="liked-products-grid">
                    {likedProducts.map((product) => {
                        // Check if the product exists (has necessary properties)
                        const productExists = product && product.product_id && product.name;
                        
                        return (
                            <li key={product.product_id || `missing-${Math.random()}`} className={`liked-product-card ${!productExists ? 'product-unavailable' : ''}`}>
                                <button 
                                    className={`unlike-button ${removingProductId === product.product_id ? 'loading' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        unlikeProduct(product.product_id);
                                    }}                                    aria-label="Remove from favorites"
                                    disabled={removingProductId === product.product_id}
                                >
                                    <FontAwesomeIcon icon="heart" />
                                </button>
                                
                                {productExists ? (
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
                                ) : (                                    <div className="liked-product-link product-unavailable-content">
                                        <div className="product-unavailable-icon">
                                            <FontAwesomeIcon icon="triangle-exclamation" />
                                        </div>
                                        <div className="liked-product-info">
                                            <p className="liked-product-name"><strong>Product unavailable</strong></p>
                                            <p className="product-unavailable-text">This product has been removed from the store</p>
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                // If no liked products are found, display a message
                <p>No liked products found.</p>
            )}
        </div>
    );
}
