import ProductImages from "../components/ProductPage/ProductImages";
import ProductInfo from "../components/ProductPage/ProductInfo";
import "../styles/ProductPage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductPage(){
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/"
    
     //Fetch product data when component mounts or Id is changed
     useEffect(()=> {
        //Exit if id is not provided
        if (!id) return;

        //Fetch product form API
        fetch(`${URL}/api/products/${id}`)
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