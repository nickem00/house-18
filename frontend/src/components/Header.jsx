import { Link } from "react-router-dom";
import '../styles/header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";

export default function Header({ setIsCartOpen, isCartOpen }) {
    const [ isHeartHovered, setIsHeartHovered ] = useState(false);
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
    const [ isMobile, setIsMobile ] = useState(false);
    const { cartItems } = useCart();

    const token = localStorage.getItem("token");    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // Toggle body class to prevent scrolling when menu is open
        document.body.classList.toggle('menu-open', !mobileMenuOpen);
    };

    // Check if screen is mobile size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => {
            window.removeEventListener('resize', checkScreenSize);
            // Clean up body class when component unmounts
            document.body.classList.remove('menu-open');
        };
    }, []);return (
        <header>
            <div className="container header-content">
                {/* Desktop Navigation */}
                {!isMobile && (
                    <>
                        <nav className="desktop-nav">
                            <ul>
                                <li><Link to="/#about-store">ABOUT US</Link></li>
                                <li><Link to="/#contact">CONTACT</Link></li>
                            </ul>
                        </nav>

                        <h1 className="logo"><Link to="/">HOUSE 18</Link></h1>

                        <nav className="desktop-nav">
                            <ul>
                                <li><Link to="/store">STORE</Link></li>
                                <li>
                                    <ul className="icons-list">
                                        <li>
                                            <Link className="icon" to={token ? "/Profile" : "/Login-Register"}>
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
                    </>
                )}

                {/* Mobile Navigation */}
                {isMobile && (                    <>
                        <div className="mobile-header">
                            <div className="mobile-logo-container">
                                <h1 className="logo"><Link to="/">HOUSE 18</Link></h1>
                            </div>
                            <button 
                                className="hamburger-menu" 
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                            >
                                <FontAwesomeIcon icon={['fas', 'bars']} />
                            </button>
                        </div>

                        {/* Mobile Slide-out Menu */}
                        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>                            <button 
                                className="close-menu"
                                onClick={toggleMobileMenu}
                                aria-label="Close menu"
                            >
                                <FontAwesomeIcon icon={['fas', 'times']} />
                            </button>
                            <nav className="mobile-nav">
                                <ul>
                                    <li><Link to="/#about-store" onClick={toggleMobileMenu}>ABOUT US</Link></li>
                                    <li><Link to="/#contact" onClick={toggleMobileMenu}>CONTACT</Link></li>
                                    <li><Link to="/store" onClick={toggleMobileMenu}>STORE</Link></li>
                                </ul>
                                
                                <ul className="user-section">
                                    <li>
                                        <Link to={token ? "/Profile" : "/Login-Register"} onClick={toggleMobileMenu}>
                                            <FontAwesomeIcon icon={token ? ['fas', 'user'] : ['far', 'user']} /> 
                                            <span>{token ? "MY PROFILE" : "LOGIN / REGISTER"}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="mobile-cart-button" onClick={() => {
                                            toggleMobileMenu();
                                            handleCartClick();
                                        }}>
                                            <FontAwesomeIcon icon={['fas', 'cart-shopping']} />
                                            <span>MY CART</span> 
                                            {cartItems.length > 0 && (
                                                <span className="cart-count">{cartItems.length}</span>
                                            )}
                                        </button>
                                    </li>
                                    <li>
                                        <Link to="/wishlist" onClick={toggleMobileMenu}>
                                            <FontAwesomeIcon icon={['far', 'heart']} /> 
                                            <span>MY WISHLIST</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        
                        {/* Overlay when menu is open */}
                        {mobileMenuOpen && (
                            <div className="menu-overlay" onClick={toggleMobileMenu}></div>
                        )}
                    </>
                )}
            </div>
        </header>
    );
}
