import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard({product}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(null);

    /*useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";
                const response = await fetch(`${URL}/api/favorites/${product.product_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsLiked(data.isFavorite);
                }
            } catch (error) {
                console.error("Failed to check favorite status:", error);
            }
        };

        checkFavoriteStatus();
    }, [product.product_id]);*/
    
    const toggleFavorite = async (productId) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            
            if (!token) {
                alert("You must be logged in to add favorites");
                return;
            }

            const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";
            
            if (isLiked) {
                const response = await fetch(`${URL}/api/favorites/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    console.error("Failed to remove from favorites");
                }

                setIsLiked(false);
                localStorage.removeItem(`favorite_${productId}`);
            } else {
                const response = await fetch(`${URL}/api/favorites/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    console.error("Failed to add to favorites");
                }

                setIsLiked(true);
            }

        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return(
        <article className="card">
            
            <Link to={`/products/${product.product_id}`} className="product-image-container">
                <img src={product.images[0]} alt={product.name} className="product-img main-img" />
                <img src={product.images[1]} alt={product.name} className="product-img hover-img" />
            </Link>
            
            <Link to={`/products/${product.product_id}`} className="product-name">{product.name}</Link>

            <p className="product-brand">HOUSE 18</p>

             <div className="icon-container">
             <p className="product-price">{product.price}kr</p>
                <FontAwesomeIcon 
                    icon={isLiked ? faHeartSolid : faHeart}
                    onClick={() => toggleFavorite(product.product_id)}
                    className={`favorite-icon ${isLiked ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                />
            </div>
           

        </article>
    );
}