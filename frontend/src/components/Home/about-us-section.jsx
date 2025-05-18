import '../../styles/home.css'
import TeamCard from './TeamCard'

// The AboutUsSection component.
// Imports and uses the TeamCard component to display team members.
export default function AboutUsSection() {
    return (
        <section className='about-us-section' id='about-us'>
            <h2 className='about-us-title'>THE PEOPLE BEHIND HOUSE 18</h2>
            <div className="about-us-image-container">
                <TeamCard 
                    name="Nicholas" 
                    role="Fullstack Integration Specialist" 
                    image="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746616899/Screenshot_2025-05-03_161625_qhi71y.png" 
                />
                <TeamCard 
                    name="Hugo" 
                    role="Feature Developer Coordinator" 
                    image="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746993763/FB_IMG_1746274068933_cvlwfz.jpg" 
                />
                <TeamCard 
                    name="Jacob" 
                    role="Technical Implementation Generalist" 
                    image="https://res.cloudinary.com/dzcqnchjm/image/upload/IMG_2275_zsk7jp.jpg" 
                />
                <TeamCard 
                    name="Pontus" 
                    role="Backend Disruption Engineer" 
                    image="https://res.cloudinary.com/dzcqnchjm/image/upload/v1747141539/image_qrbz4r.jpg" 
                />
            </div>
        </section>
    )
}