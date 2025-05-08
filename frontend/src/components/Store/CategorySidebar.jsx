export default function CategorySidebar({ categoryCounts}){
    const categories = ["T-shirts", "Accessories", "Pants", "Shirts"];

    return (
        <aside className="sidebar">
            <h4>CATEGORIES</h4>
            <ul>
                {categories.map((category)=>(
                    <li key={category}>
                        {category} <span>({categoryCounts[category] || 0})</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}