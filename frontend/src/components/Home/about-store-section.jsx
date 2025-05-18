import '../../styles/home.css'

// The AboutStoreSection component.
// This component displays information about the store, including images and text.
export default function AboutStoreSection() {
    return (
        <section className='about-store-section' id='about-store'>
            <h2 className='about-store-title'>ABOUT THE STORE</h2>
            <p className='about-store-text'>House 18 is more than a store — it's a philosophy of curated essentials, rich textures, and timeless tones.</p>
            <div className='about-store-image-container'>
                <div className="about-store-image-card">
                    <img src="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746553301/klim-musalimov-RkMX-abF_IQ-unsplash_wuyssi.jpg" alt="Background image of building" />
                    <div className='about-store-image-overlay' />
                    <div className="about-store-image-text">
                        <p>Timeless Essentials</p>
                        <p>Designed to elevate you</p>
                    </div>
                </div>
                <div className="about-store-image-card">
                    <img src="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746553303/wes-hicks-7r6mdIcQeKk-unsplash_kzeawh.jpg" alt="Background image of building" />
                    <div className='about-store-image-overlay' />
                    <div className="about-store-image-text">
                        <p>Quality First</p>
                        <p>We curate what lasts</p>
                    </div>
                </div>
            </div>
        </section>
    )
}