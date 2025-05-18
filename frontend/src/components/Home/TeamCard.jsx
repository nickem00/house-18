// Component to render a team member's card on the About Us page.
export default function TeamCard({ name, role, image }) {
    return (
        <div className="about-us-image-card">
            <img src={image} alt={name} />
            <div className="about-us-image-overlay"></div>
            <div className="about-us-image-text">
                <p>{name}</p>
                <p>{role}</p>
            </div>
        </div>
    );
}
