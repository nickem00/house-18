import "../styles/store.css"
import CategorySidebar from "../components/Store/CategorySidebar";
import ProductGrid from "../components/Store/ProductGrid";

export default function Store() {
    return(
        <div className="store">
            <CategorySidebar />
            <ProductGrid />
        </div>
    );
}