import '../styles/404NotFound.css'; 
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='not-found-container'>
            <h1 className='not-found-header'>
                404 <br />
                Not Found
            </h1>
            <p className='not-found-message'>The page you are looking for does not exist.</p>
            <Link to="/" className='not-found-home-button'>Go to Home</Link>
        </div>
    );
}