import React, { useEffect } from 'react'
import { deleteReview, getProductReviews } from '../../store/reducers/productReviewsReducer'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import "./Review.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'

const Review = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {reviews}=useSelector(state=>state.ProductReviews)
  const {reviwedProductId}=useParams()
console.log(reviwedProductId)
  useEffect(()=>{
    dispatch(getProductReviews({reviwedProductId}))
  },[dispatch, reviwedProductId,reviews])
  
  const deleteReviewHandler = (id) => {
    dispatch(deleteReview({ id, reviwedProductId }))
    navigate("/admin/reviews")
  }

  return (
    <div>
      <div className='reviewDetails'>
        <Sidebar />
        <div className="reviewsContainer">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>User</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews && reviews.map((review) => (
              <tr key={review._id}>
                <td>{review._id}</td>
                <td>{review.name}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
                <td>
                  <button onClick={() => deleteReviewHandler(review._id)}>
                    <BsTrash color='red' size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </div>
  )
}

export default Review
