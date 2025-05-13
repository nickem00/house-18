import { useCart } from "../context/useCart";
import '../styles/Checkout.css';
import { useState, useEffect } from "react";
import { createOrder } from "../features/createOrder";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cartItems, clearCart } = useCart();
    const [ shippingCost, setShippingCost ] = useState(49);
    const [ enrichedCartItems, setEnrichedCartItems ] = useState([]);
    const navigate = useNavigate();

    // States for all input fields
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ postalCode, setPostalCode ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ cardNumber, setCardNumber ] = useState("");
    const [ expirationDate, setExpirationDate ] = useState("");
    const [ cvc, setCvc ] = useState("");
    const [ shippingMethod, setShippingMethod ] = useState("standard");

    const baseAPIUrl = import.meta.env.VITE_API_BASE_URL;
    
    // Fetch product details from the API
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

    // Function to handle the order placement
    const handlePlaceOrder = async () => {
        // Check if all required fields are filled
        if (!fullName || !email || !address || !city || !postalCode || !country || !cardNumber || !expirationDate || !cvc) {
            alert("Please fill in all required fields");
            return;
        }
        
        const result = await createOrder(cartItems, shippingCost);

        if (result.error) {
            alert(result.error);
            return;
        }        alert("Order placed successfully!");
        clearCart();
        navigate("/store");
    }

    // Calculate the total price from the enriched cart items
    const calculateTotal = () => {
        return enrichedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + shippingCost;
    };

    // Prepared order data structure - remove the variable assignment to avoid unused variable warning
    // Order data shape for reference:
    // {
    //     items: enrichedCartItems,
    //     shipping: {
    //         fullName,
    //         email,
    //         address,
    //         city,
    //         postalCode,
    //         country,
    //         method: shippingMethod,
    //         cost: shippingCost
    //     },
    //     total: calculateTotal()
    // };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-flex-container">
                <div className="checkout-left-shipping">                    <div className="checkout-shipping-address">
                        <h2>Shipping Address</h2>
                        <form className="contact-shipping-form">
                            <input 
                                type="text" 
                                placeholder="Full name" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Address" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="City" 
                                value={city} 
                                onChange={(e) => setCity(e.target.value)} 
                            />
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Postal Code" 
                                    id="shipping-postal-code" 
                                    value={postalCode} 
                                    onChange={(e) => setPostalCode(e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Country" 
                                    id="shipping-country" 
                                    value={country} 
                                    onChange={(e) => setCountry(e.target.value)} 
                                />
                            </div>
                        </form>
                    </div>
                    
                    <div className="checkout-shipping-method">
                        <h2>Shipping Method</h2>
                        <form className="shipping-method-form">                            <label>
                                <input 
                                    type="radio" 
                                    name="shipping-method" 
                                    value="standard" 
                                    checked={shippingMethod === "standard"}
                                    onChange={() => {
                                        setShippingMethod("standard");
                                        setShippingCost(49);
                                    }} 
                                />
                                <p className="shipping-method-type">
                                    Standard Shipping
                                    <span className="shipping-method-price">49kr</span>
                                </p>
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="shipping-method" 
                                    value="express"
                                    checked={shippingMethod === "express"}
                                    onChange={() => {
                                        setShippingMethod("express");
                                        setShippingCost(99);
                                    }} 
                                />
                                <p className="shipping-method-type">
                                    Express Shipping
                                    <span className="shipping-method-price">99kr</span>
                                </p>
                            </label>
                        </form>
                    </div>                    <div className="checkout-payment-details">
                        <h2>Payment Details</h2>
                        <form className="payment-details-form">
                            <input 
                                type="text" 
                                placeholder="Card Number" 
                                id="payment-card-number" 
                                value={cardNumber} 
                                onChange={(e) => setCardNumber(e.target.value)} 
                            />
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Expiration date" 
                                    id="payment-expiration-date" 
                                    value={expirationDate} 
                                    onChange={(e) => setExpirationDate(e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="CVC" 
                                    id="payment-cvc" 
                                    value={cvc} 
                                    onChange={(e) => setCvc(e.target.value)} 
                                />
                            </div>
                        </form>
                    </div>

                    <button 
                        className="checkout-order-button" 
                        onClick={handlePlaceOrder}
                        disabled={
                            !fullName || 
                            !email || 
                            !address || 
                            !city || 
                            !postalCode || 
                            !country || 
                            !cardNumber || 
                            !expirationDate || 
                            !cvc || cartItems.length === 0
                        }
                        >
                            PLACE ORDER
                    </button>
                </div>                <div className="checkout-right-summary">
                    <h2>Order Summary</h2>
                    {enrichedCartItems.length > 0 ? (
                        <>
                            {enrichedCartItems.map((item, index) => (
                                <div key={index} className="checkout-item">
                                    <div className="checkout-item-info">
                                        <p className="checkout-item-name">{item.name}</p>
                                        <div className="checkout-item-details">
                                            <span className="checkout-item-size">Size: {item.size}</span>
                                            <span className="checkout-item-quantity">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <p className="checkout-item-price">{item.price * item.quantity} kr</p>
                                </div>
                            ))}
                        
                            <div className="checkout-summary-line">
                                <p>Shipping</p>
                                <p>{shippingCost} kr</p>
                            </div>
                            <div className="checkout-summary-total">
                                <p>Total</p>
                                <p>
                                    {calculateTotal()} kr
                                </p>
                            </div>
                        </>
                    ) : (
                        <p>Your Cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

// Use the following code to display cart items in the checkout page
{/* <div>
    {enrichedCartItems.length > 0 ? (
        enrichedCartItems.map((item, index) => (
            <div key={index}>
                <p>{item.name}</p>
                <p>{item.price}</p>
            </div>
        ))
    ) : (
        <p>Your Cart is empty.</p>
    )}
</div> */}