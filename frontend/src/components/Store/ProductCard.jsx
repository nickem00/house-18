export default function ProductCard({product}) {
    return(
        <article className="card">
            <div className="product-image-container">
                <img src={product.images[0]} alt={product.name} className="product-img main-img" />
                <img src={product.images[1]} alt={product.name} className="product-img hover-img" />
            </div>
            
            <h4>{product.name}</h4>
            <p>{product.price}kr</p>
        </article>
    );
}