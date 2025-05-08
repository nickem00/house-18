import "../styles/store.css"
import { useEffect, useState } from "react";
import CategorySidebar from "../components/Store/CategorySidebar";
import ProductGrid from "../components/Store/ProductGrid";
import getCategoryCount from "../features/categoryCount";

export default function Store() {
    const [categoryCounts, setCategoryCounts] = useState({});

    return(
        <div className="store">
            <CategorySidebar />
            <ProductGrid />
        </div>
    );
}