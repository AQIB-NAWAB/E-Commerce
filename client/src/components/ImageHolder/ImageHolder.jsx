import React, { useState } from "react";
import "./imageHolder.css"
const ImageHolder = ({ imageUrl }) => {
  const [showFullImage, setShowFullImage] = useState(false);

  const handleImageClick = () => {
    setShowFullImage(!showFullImage);
  };



  return (
    <div className="image_holder">

      <img src={imageUrl} onClick={handleImageClick}  alt="Product" className="img_product"/>


<div 
className={`${showFullImage ? "show_image":"no_show_image"}`}>
  <img src={imageUrl} onClick={handleImageClick} alt="Product" />
</div>
    </div>
  );
};

export default ImageHolder;
