import { useCart } from "../../context/useCart"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

export default function ProductInfo({product}){

    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
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
    }, [product.product_id]);
    
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
        } finally {
            setIsLoading(false);
        }
    };    return(
        <section className="product-info">
            <div className="product-header">
                <h4 className="product-title">{product.name}</h4>
                <FontAwesomeIcon 
                    icon={isLiked ? faHeartSolid : faHeart}
                    onClick={() => toggleFavorite(product.product_id)}
                    className={`favorite-icon ${isLiked ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                />
            </div>
            <p>{product.price}kr</p>

            <section className="product-actions"  defaultValue="SIZE">
                <select
                 className="size-menu"
                 name="sizes" id="sizes"
                 onChange={(e) => setSelectedSize(e.target.value)}
                 value={selectedSize}>
                <option value="" disabled selected>SIZE</option>
                {product.variants.map((variant)=> (
                    <option 
                    key={variant._id}
                    value={variant.size}
                    disabled={variant.stock === 0}
                    
                    >
                        {variant.size} {variant.stock === 0 ? "(out of stock)" : ""}
                    </option>
                ))}
            </select>

            <button className="add-to-cart-btn" 
            onClick={() => {

                if (!selectedSize) {
                    alert("You have to choose a size before adding to cart")
                    return;
                }
                
                const cartItem = {
                product_id: product.product_id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: selectedSize, 
                quantity: 1
                }
                
                addToCart(cartItem);
                setSelectedSize("");
                
                }} >ADD TO CART</button>
            </section>

            <ul className="shipping-and-details">
                <li>✔ Free shipping over 499 kr</li>
                <li>✔ Next-day delivery available*</li>
                <li>✔ Free returns with new order</li>
                <li>✔ Home delivery</li>
            </ul>

            <p className="productSite-description">{product.description}</p>
            
        </section>
    )
}