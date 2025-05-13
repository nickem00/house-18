import '../styles/CartModal.css'
import { useCart } from '../context/useCart';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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

    if(!isOpen) return null;

    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className='cart-modal-close' onClick={onClose}>x</button>
            <h2>Your Cart</h2>
            {hasItems ? (
                <ul className='cart-item-list'>
                    {enrichedCartItems.map((item, index) => (
                        <li key={index}>
                            <div>{item.name} - {item.price} kr</div>
                            <button onClick={() => handleRemove(index)} className='remove-item-button'>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
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