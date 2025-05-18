export default function CategorySidebar({ categoryCounts, categorySelect}){
    const categories = ["T-shirts", "Accessories", "Pants", "Shirts"];

    return (
        <aside className="sidebar">
            <button className="all-categories-btn" onClick={()=> categorySelect(null)}>CATEGORIES</button>
            <ul>
                {categories.map((category)=>(
                    <li key={category}>
                       <button className="category-btn" onClick={()=>categorySelect(category)}
                       
                       >{/* Show count of products in category, default to 0 if none */}
                        {category} <span>({categoryCounts[category] || 0})</span></button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}