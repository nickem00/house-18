import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ProfilePage.css';

export default function LikedProducts({ likedProducts, removingProductId, unlikeProduct }) {
    return (
        <div className='profile-liked-products'>
            <h2>Liked Products:</h2>
            {likedProducts && likedProducts.length > 0 ? (
                <ul className="liked-products-grid">
                    {likedProducts.map((product) => (
                        <li key={product.product_id} className="liked-product-card">
                            <button 
                                className={`unlike-button ${removingProductId === product.product_id ? 'loading' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    unlikeProduct(product.product_id);
                                }}
                                aria-label="Remove from favorites"
                                disabled={removingProductId === product.product_id}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
    );
}
