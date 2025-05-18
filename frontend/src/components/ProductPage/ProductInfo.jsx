import { useCart } from "../../context/useCart"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

export default function ProductInfo({product}){

    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(null);
    
    //Check if product has been saved by user earlier when component mounts
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return; //Must be logged in

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
    
    //Adding and removing product from favorites
    const toggleFavorite = async (productId) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            
            //Must be logged in
            if (!token) {
                alert("You must be logged in to add favorites");
                return; 
            }

            const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";
            
            //If liked = remove from favorites
            if (isLiked) {
                const response = await fetch(`${URL}/api/favorites/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    console.error("Failed to remove from favorites");                }

                setIsLiked(false);
            } else {
                
                //If not liked = add to favorites
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
    };

    return(
        <section className="product-info">
            <h4 className="product-title">{product.name}</h4>
            <p>{product.price}kr</p>

            <section className="product-actions"  defaultValue="SIZE">
                {/* Size selector dropdown */}
                <select
                 className="size-menu"
                 name="sizes" id="sizes"
                 onChange={(e) => setSelectedSize(e.target.value)}
                 value={selectedSize}>
                <option value="" disabled selected>SIZE</option>
                {/*Mapping throug available sizes*/}
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

            <section className="actions-row">
                {/* Add to cart button */}
                <button
                className="add-to-cart-btn"
                onClick={() => {
                    if (!selectedSize) {
                    alert("You have to choose a size before adding to cart");
                    return;
                    }

                    //Create cart item object
                    const cartItem = {
                    product_id: product.product_id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    size: selectedSize,
                    quantity: 1,
                    };

                    //Add to cart and then reset size
                    addToCart(cartItem);
                    setSelectedSize("");
                }}
                >
                ADD TO CART
                </button>
                {/* Favorite toggle button */}
                <button
                    className="favorite-btn"
                    onClick={() => toggleFavorite(product.product_id)}
                    disabled={isLoading}
                    >
                    <FontAwesomeIcon
                        icon={isLiked ? faHeartSolid : faHeart}
                        className={`favorite-icon ${isLiked ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                    />
                </button>
            </section>
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