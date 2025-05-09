import "../styles/store.css"
import { useEffect, useState } from "react";
import CategorySidebar from "../components/Store/CategorySidebar";
import ProductGrid from "../components/Store/ProductGrid";
import getCategoryCount from "../features/categoryCount";

export default function Store() {
    const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const [products, setProducts] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(()=> {
        fetch(`${URL}/products`)
            .then((res) => res.json())
            .then((data)=>{
                setProducts(data);
                setCategoryCounts(getCategoryCount(data));
            })
            .catch((err)=> 
                console.error('Error occured while fetching products: ', err));

    }, []);

    let filteredProducts = products;

    if (selectedCategory){
        filteredProducts = products.filter(
            (product) => product.category === selectedCategory);
    }

    return(
        <div className="store">
            <CategorySidebar categoryCounts={categoryCounts} onCategorySelect={setSelectedCategory}/>
            <ProductGrid products={products} />
        </div>
    );
}

