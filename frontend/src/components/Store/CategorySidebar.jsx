export default function CategorySidebar(){
    const categories =[
        {name: "Accessories", count: 0},
        {name: "Shirts", count: 0},
        {name: "Pants", count: 0},
        {name: "T-shirts", count: 0}    
    ];

    return (
        <aside className="sidebar">
            <h4>CATEGORIES</h4>
            <ul>
                {categories.map((c)=>(
                    <li key={c.name}>
                        {c.name} <span>({c.count})</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}