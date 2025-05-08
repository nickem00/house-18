export default function ProductCard({product}) {
    return(
        <article className="card">
            <img src={product.images[0]} alt={product.name} className="product-img" />
            <h4>{product.name}</h4>
            <p>{product.price}kr</p>
        </article>
    );
}