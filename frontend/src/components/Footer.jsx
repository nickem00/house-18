import '../styles/footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <h2>HOUSE 18</h2>
          <p>Timeless. Thoughtful. Crafted.</p>
        </div>

        <div className="footer-columns">          <div className="footer-column">
            <h4>Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/store">Store</Link></li>
              <li><Link to="/#about-store">About Us</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </div>          <div className="footer-column">
            <h4>Contact Information</h4>
            <ul>
              <li>Email: <a href="mailto:info@house18.com">info@house18.com</a></li>
              <li>Location: Sweden</li>
              <li><a href="https://github.com/nickem00/house-18" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="footer-bottom-text">
        &copy; {new Date().getFullYear()} House 18. All rights reserved.
      </p>
    </footer>
  );
}
