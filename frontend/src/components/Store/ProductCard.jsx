import { Link } from "react-router-dom";

export default function ProductCard({product}) {
    return(
        <article className="card">
          
               <Link to={`/products/${product.product_id}`} className="product-image-container">
                <img src={product.images[0]} alt={product.name} className="product-img main-img" />
                <img src={product.images[1]} alt={product.name} className="product-img hover-img" />
               </Link> 
            
            <Link to={`/products/${product.product_id}`} className="product-name">{product.name}</Link>
            <p className="product-brand">HOUSE 18</p>
            <p className="product-price">{product.price}kr</p>
        </article>
    );
}