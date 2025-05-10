import ProductImages from "../components/ProductPage/ProductImages";
import ProductInfo from "../components/ProductPage/ProductInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductPage(){
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
   
     useEffect(()=> {
        if (!id) return;

                fetch(`${URL}/products/${id}`)
                    .then(res => {
            if (!res.ok) throw new Error("Not found");
            return res.json();
        })
        .then(setProduct)
        .catch(err => console.error(err));
        
            }, [id, URL]);
    
        if (!product) return <p>Loading product…</p>;

    return(
        <div className="product-page">
            <ProductImages images={product.images} product={product}/>
            <ProductInfo product={product}/>
        </div>
    )
}