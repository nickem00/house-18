import { useState, useEffect} from "react";

export default function ProductImages({images, product}){
    const [activeImage, setActiveImage] = useState(null);

    useEffect(()=> {
        if (images.length > 0){
            setActiveImage(images[0]);
        }
    }, [images]);

    

    return(
       <section className="product-images">
        <div className="thumbnails">
            {images.map((img, index)=> {
                return (<img
                key={index} src={img} alt={`${product.name} ${index + 1}`}
                onClick={() => setActiveImage(img)}
                className={img === activeImage ? "active": ""}
                />);
            })}
        </div>

        <div className="main-image">
            {activeImage && <img src={activeImage} alt={product.name} />}
        </div>
            
       </section>

    )
}