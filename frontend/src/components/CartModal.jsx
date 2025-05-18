import '../styles/CartModal.css'
import { useCart } from '../context/useCart';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// CartModal component or Shopping Cart
// This components shows when user clicks on the cart icon.
// It shows the items in the cart, their quantity and price.
// Uses local storage to persist cart items.
export default function CartModal({ isOpen, onClose }) {
    const { cartItems, clearCart, hasItems, setCartItems } = useCart();
    const [enrichedCartItems, setEnrichedCartItems] = useState([]);
    const navigate = useNavigate();
    
    // Function to fetch product details from the API
    // if the cart is not empty.
    const baseAPIUrl = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        const fetchProductDetails = async () => {
            const responses = await Promise.all(
                cartItems.map(item => 
                    fetch(`${baseAPIUrl}/api/products/${item.product_id}`)
                        .then(res => res.json())
                        .then(product => ({
                            ...item,
                            name: product.name,
                            price: product.price
                        }))
                )
            );
            setEnrichedCartItems(responses);
        };

        if (cartItems.length > 0) {
            fetchProductDetails();
        } else {
            setEnrichedCartItems([]);
        }
    }, [cartItems, baseAPIUrl]);

    // Closes the modal, then navigates to the checkout page.
    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    // Function to remove an item from the cart
    const handleRemove = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    // Function to increase the quantity of an item in the cart
    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index] = {
            ...updatedCart[index],
            quantity: updatedCart[index].quantity + 1
        };
        setCartItems(updatedCart);
    };

    // Function to decrease the quantity of an item in the cart
    const handleDecreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index] = {
                ...updatedCart[index],
                quantity: updatedCart[index].quantity - 1
            };
            setCartItems(updatedCart);
        } else {
            // If quantity is 1, remove the item instead
            handleRemove(index);
        }
    };

    // If the cart shouldn't be open, return null
    // to prevent rendering the modal.
    if(!isOpen) return null;

    // The actual modal component
    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className='cart-modal-close' onClick={onClose}>x</button>
            <h2>Your Cart</h2>
            {/* If the cart has items, return this */}
            {hasItems ? (
                <ul className='cart-item-list'>
                    {enrichedCartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-size">Size: {item.size}</div>
                                <div className="cart-item-price">{item.price} kr</div>
                            </div>
                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => handleDecreaseQuantity(index)}
                                        className="quantity-button"
                                        aria-label="Decrease quantity"
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <span className="item-quantity">{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(index)}
                                        className="quantity-button"
                                        aria-label="Increase quantity"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className='remove-item-button'
                                    aria-label="Remove item"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                // If the cart is empty, show a message
                <p>Your cart is empty.</p>
            )}
            <div className='cart-modal-footer'>
                <button disabled={!hasItems} onClick={handleCheckout} className='checkout-button'>
                    Checkout
                </button>
                <button onClick={clearCart} className='clear-cart-button'>
                    Clear
                </button>
            </div>
            </div>
        </div>
    )
}