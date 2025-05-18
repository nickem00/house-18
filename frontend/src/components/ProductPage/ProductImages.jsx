import { useState, useEffect} from "react";

export default function ProductImages({images, product}){
    //Track which image is being displayed as main image using state
    const [activeImage, setActiveImage] = useState(null);

    //First image set as active image by default
    useEffect(()=> {
        if (images.length > 0){
            setActiveImage(images[0]);
        }
    }, [images]);

    return(
       <section className="product-images">
        {/*Thumbnail strip*/}
        <div className="thumbnails">
            {images.map((img, index)=> {
                return (<img
                key={index} src={img} alt={`${product.name} ${index + 1}`}
                //Update main image when thumbnail is clicked
                onClick={() => setActiveImage(img)}
                className={img === activeImage ? "active": ""}
                />);
            })}
        </div>
        
        {/*Main image*/}
        <div className="main-image">
            {activeImage && <img src={activeImage} alt={product.name} />}
        </div>
            
       </section>

    )
}