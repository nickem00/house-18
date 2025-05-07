import { Link } from "react-router-dom";
import '../styles/header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useCart } from "../context/useCart";
import CartModal from "./CartModal";

export default function Header() {
    const [ isHeartHovered, setIsHeartHovered ] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { cartItems } = useCart();

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <header>
            <div className="container header-content">
                <nav>
                    <ul>
                        <li><Link to="/#about-store">ABOUT US</Link></li>
                        <li><Link to="/#contact">CONTACT</Link></li>
                    </ul>
                </nav>

                <h1 className="logo"><Link to="/">HOUSE 18</Link></h1>

                <nav>
                    <ul>
                        <li><Link to="/store">STORE</Link></li>
                        <li>
                            <ul className="icons-list">
                                <li>
                                    <Link className="icon" to="/profile">
                                        <FontAwesomeIcon icon={['far', 'user']} />
                                    </Link>
                                </li>
                                <li>
                                    <button className="icon cart-button" onClick={handleCartClick}>
                                        <FontAwesomeIcon icon={['fas', 'cart-shopping']} />
                                        {cartItems.length > 0 && (
                                            <span className="cart-badge">{cartItems.length}</span>
                                        )}
                                    </button>
                                </li>
                                <li>
                                    <Link
                                        className="icon"
                                        to="/wishlist"
                                        onMouseEnter={() => setIsHeartHovered(true)}
                                        onMouseLeave={() => setIsHeartHovered(false)}
                                    >
                                        <FontAwesomeIcon icon={isHeartHovered ? ['fas', 'heart'] : ['far', 'heart']} />
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}
