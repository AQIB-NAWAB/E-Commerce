import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { FaUserAlt } from 'react-icons/fa';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: '#CCCCCC',
    activeColor: '#FFB900',
    size: window.innerWidth < 786 ? 20 : 40,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="review_card">
      <div className="review_card__header">
        <FaUserAlt className="review_card__icon" />
        <h3 className="review_card__name">
         {review.name}</h3>
      
      <ReactStars {...options} />
      </div>
      <br/>

      <hr className="review_card__divider" />
      <hr className="review_card__divider" />
      <hr className="review_card__divider" />
<br/>
      <p className="review_card__comment">
        <h3>Comment</h3>
        {review.comment}</p>
    </div>
  );
};

export default ReviewCard;
