import '../../styles/home.css'
import TeamCard from './TeamCard'

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
                    image="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746616899/Screenshot_2025-05-02_182649_vwyavk.png" 
                />
                <TeamCard 
                    name="Jacob" 
                    role="Technical Implementation Generalist" 
                    image="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746616899/Screenshot_2025-05-03_161953_upzejn.png" 
                />
                <TeamCard 
                    name="Pontus" 
                    role="Bi-odlare" 
                    image="https://res.cloudinary.com/dzcqnchjm/image/upload/v1746616900/Screenshot_2025-05-03_161505_ayirj2.png" 
                />
            </div>
        </section>
    )
}