import ProductCard from "./ProductCard";

export default function ProductGrid({products}){
    return(
        <section className="product-grid-container">
            {products.map((product)=> {
                return <ProductCard key={product._id} product={product} />
            })}
        </section>
    )
}