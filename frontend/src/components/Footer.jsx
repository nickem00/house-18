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

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/store">Store</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Information</h4>
            <ul>
              <li>Email: <a href="mailto:nicholas.malm0086@stud.hkr.se">info@house18.com</a></li>
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
