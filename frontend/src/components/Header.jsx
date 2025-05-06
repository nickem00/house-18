import { Link } from "react-router-dom";
import '../styles/header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

export default function Header() {
    const [ isHeartHovered, setIsHeartHovered ] = useState(false);

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/about">ABOUT US</Link></li>
                    <li><Link to="/contact">CONTACT</Link></li>
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
                                <Link className="icon" to="/cart">
                                    <FontAwesomeIcon icon={['fas', 'cart-shopping']} />
                                </Link>
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
        </header>
    );
}