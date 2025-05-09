export default function CategorySidebar({ categoryCounts, categorySelect}){
    const categories = ["T-shirts", "Accessories", "Pants", "Shirts"];

    return (
        <aside className="sidebar">
            <button className="all-categories-btn" onClick={()=> categorySelect(null)}>CATEGORIES</button>
            <ul>
                {categories.map((category)=>(
                    <li key={category}>
                       <button className="category-btn" onClick={()=>categorySelect(category)}
                       >{category}</button><span>({categoryCounts[category] || 0})</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}