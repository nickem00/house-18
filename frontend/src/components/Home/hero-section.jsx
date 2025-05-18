import { Link } from "react-router-dom";
import '../../styles/home.css';

// The HeroSection component, which is the first section of the home page.
// It contains a title, a subtitle, and a button that links to the store page.
export default function HeroSection() {

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
        </section>
    );
}
