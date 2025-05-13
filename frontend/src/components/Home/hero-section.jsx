import { Link } from "react-router-dom";
import '../../styles/home.css';
import { useCart } from "../../context/useCart";

export default function HeroSection() {
    // == FOR TESTING CART FUNCTIONALITY ==
    const { addToCart } = useCart();

    const testItem = {
        product_id: "P004",
        size: "M",
        quantity: 1,
    }
    // =======================================

    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="hero-text-div">
                    <h1 className="hero-text">More than things.</h1>
                    <h1 className="hero-text">A way of living.</h1>
                    <Link className="shop-now-button" to="/store">SHOP NOW</Link>
                </div>
                <div className="hero-image">
                    <img src="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746556423/shirt-hero-section_b7rsnf.png" alt="Hero" />
                </div>
            </div>
            {/* TESTBUTTON */}
            <button onClick={() => addToCart(testItem)} className="add-to-cart-button">
                Add to Cart
            </button>
            {/* ============= */}
        </section>
    );
}
