import { useCart } from "../context/useCart";
import '../styles/Checkout.css';
import { useState } from "react";

export default function Checkout() {
    const { cartItems } = useCart();
    const [ shippingCost, setShippingCost ] = useState(49);

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-flex-container">
                <div className="checkout-left-shipping">

                    <div className="checkout-shipping-address">
                        <h2>Shipping Address</h2>
                        <form className="contact-shipping-form">
                            <input type="text" placeholder="Full name" />
                            <input type="text" placeholder="Email" />
                            <input type="text" placeholder="Address" />
                            <input type="text" placeholder="City" />
                            <div>
                                <input type="text" placeholder="Postal Code" id="shipping-postal-code"/>
                                <input type="text" placeholder="Country" id="shipping-country"/>
                            </div>
                        </form>
                    </div>
                    
                    <div className="checkout-shipping-method">
                        <h2>Shipping Method</h2>
                        <form className="shipping-method-form">
                            <label>
                                <input 
                                    type="radio" 
                                    name="shipping-method" 
                                    value="standard" 
                                    defaultChecked
                                    onChange={() => setShippingCost(49)} 
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
                                    onChange={() => setShippingCost(99)} 
                                />
                                <p className="shipping-method-type">
                                    Express Shipping
                                    <span className="shipping-method-price">99kr</span>
                                </p>
                            </label>
                        </form>
                    </div>

                    <div className="checkout-payment-details">
                        <h2>Payment Details</h2>
                        <form className="payment-details-form">
                            <input type="text" placeholder="Card Number" id="payment-card-number"/>
                            <div>
                                <input type="text" placeholder="Expiration date" id="payment-expiration-date"/>
                                <input type="text" placeholder="CVC" id="payment-cvc"/>
                            </div>
                        </form>
                    </div>

                    <button className="checkout-order-button">PLACE ORDER</button>
                </div>
                <div className="checkout-right-summary">
                    <h2>Order Summary</h2>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item, index) => (
                                <div key={index} className="checkout-item">
                                    <p>{item.name}</p>
                                    <p>{item.price} kr</p>
                                </div>
                            ))}
                        
                            <div className="checkout-summary-line">
                                <p>Shipping</p>
                                <p>{shippingCost} kr</p>
                            </div>
                            <div className="checkout-summary-total">
                                <p>Total</p>
                                <p>
                                    {cartItems.reduce((sum, item) => sum + item.price, 0) + shippingCost} kr
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
    {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
            <div key={index}>
                <p>{item.name}</p>
                <p>{item.price}</p>
            </div>
        ))
    ) : (
        <p>Your Cart is empty.</p>
    )}
</div> */}