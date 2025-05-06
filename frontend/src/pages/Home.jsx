import '../styles/home.css';
import HeroSection from '../components/Home/hero-section.jsx';
import AboutStoreSection from '../components/Home/about-store-section.jsx';
import AboutUsSection from '../components/Home/about-us-section.jsx';
import ContactSection from '../components/Home/contact-section.jsx';

export default function Home() {
    return (
        <div className="home">
            <HeroSection />
            <AboutStoreSection />
            <AboutUsSection />
            <ContactSection/>
        </div>
    );
}