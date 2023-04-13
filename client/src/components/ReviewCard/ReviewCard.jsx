import React from 'react'
import ReactStars from "react-rating-stars-component"
import {FaUserAlt} from "react-icons/fa"
import "./ReviewCard.css"
const ReviewCard = ({review}) => {
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600 ?24:30,
        value:review.rating,
        isHalf:true
    }
  return (
    <div>
<div className="reviewCard">
    <span>
    <FaUserAlt/>
    <p>{review.name}</p>
    <ReactStars  {...options}/>
    </span>
    <span>{review.comment}</span>
</div>
    </div>
  )
}

export default ReviewCard