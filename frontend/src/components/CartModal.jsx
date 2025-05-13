import '../styles/CartModal.css'
import { useCart } from '../context/useCart';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export default function CartModal({ isOpen, onClose }) {
    const { cartItems, clearCart, hasItems, setCartItems } = useCart();
    const [enrichedCartItems, setEnrichedCartItems] = useState([]);
    const navigate = useNavigate();
    
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

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    const handleRemove = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index] = {
            ...updatedCart[index],
            quantity: updatedCart[index].quantity + 1
        };
        setCartItems(updatedCart);
    };

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

    if(!isOpen) return null;

    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className='cart-modal-close' onClick={onClose}>x</button>
            <h2>Your Cart</h2>
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