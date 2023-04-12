import React from 'react'
import {Link} from "react-router-dom"
import "./productCard.css"
import ReactStars from 'react-stars'
const ProductCard = ({product}) => {
  const { name, images, _id, ratings, numOfReviews, price } = product;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    count: 5,
    value: parseFloat(ratings),
  };

  return (
    <div className='productCard'>
      <Link to={`/product/${_id}`}>
      <img src={images[0].url} alt={name} />
      <p>{name}</p>
      <div>
      <ReactStars {...options}/>
      <span>{numOfReviews} Reviews </span>
      </div>
      <span>{`$${price}`}</span>
      </Link>
    </div>
  )
}

export default ProductCard;
