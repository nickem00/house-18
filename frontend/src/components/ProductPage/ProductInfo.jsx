import { useCart } from "../../context/useCart"
import { useState } from "react";

export default function ProductInfo({product}){

    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState("");

    return(
        <section className="product-info">
            <h4 className="product-title">{product.name}</h4>
            <p>{product.price}kr</p>

            <section className="product-actions"  defaultValue="SIZE">
                <select
                 className="size-menu"
                 name="sizes" id="sizes"
                 onChange={(e) => setSelectedSize(e.target.value)}
                 value={selectedSize}>
                <option value="" disabled selected>SIZE</option>
                {product.variants.map((variant)=> (
                    <option 
                    key={variant._id}
                    value={variant.size}
                    disabled={variant.stock === 0}
                    
                    >
                        {variant.size} {variant.stock === 0 ? "(out of stock)" : ""}
                    </option>
                ))}
            </select>

            <button className="add-to-cart-btn" 
            onClick={() => {

                if (!selectedSize) {
                    alert("You have to choose a size before adding to cart")
                    return;
                }
                
                const cartItem = {
                product_id: product.product_id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: selectedSize, 
                quantity: 1
                }
                
                addToCart(cartItem);
                setSelectedSize("");
                
                }} >ADD TO CART</button>
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