export default function ProductInfo({product}){
    return(
        <section className="product-info">
            <h4>{product.name}</h4>
            <p>{product.price}kr</p>

            <section className="product-actions"  defaultValue="">
                <select className="size-menu" name="sizes" id="sizes">
                <option value="" disabled selected>Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <button className="add-to-cart-btn">Add to cart</button>
            </section>

            <ul className="shipping-and-details">
                <li>✔ Free shipping over 499 kr</li>
                <li>✔ Next-day delivery available*</li>
                <li>✔ Free returns with new order</li>
                <li>✔ Home delivery</li>
            </ul>

            <p className="productSite-description">{product.description}</p>
            
        </section>
    )
}