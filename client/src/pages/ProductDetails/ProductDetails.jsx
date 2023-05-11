import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading/Loading";
import ImageHolder from "../../components/ImageHolder/ImageHolder";
import { fetchProductDetails } from "../../store/reducers/ProductReducer";
import "./productDetails.css";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import {FcNext} from "react-icons/fc"
import {FcPrevious} from "react-icons/fc" 
import {addToCart} from "../../store/reducers/CartReducer"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from 'react-stars'
import { sendReview } from "../../store/reducers/productReviewsReducer";

const ProductDetails = () => {
  const navigate=useNavigate()
  const user=useSelector(state=>state.User?.user?.user)
  const [selected,setSelected]=useState(0)
const [quantity,setQuantity]=useState(0)
const [showModal, setShowModal] = useState(false);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [id, dispatch,navigate]);

  const state = useSelector((state) => state.Products);
let productId;
  const product = state.single_product_details.product;
  if (product && product._id) {
    productId=product._id
  }
  if (state.loading) {
    return <Loading />;
  }
 const increaseQnty=()=>{
  if(product.stock<=quantity)return toast.error("Limit does not meet .")
  const qunty=quantity+1
  setQuantity(qunty)
 }

 const decreaseQnty=()=>{
  if(1>=quantity)return toast.error("Limit does not meet .")
  const qunty=quantity-1
  setQuantity(qunty)
 }
 const addCart=()=>{
  if(quantity==0){
    return toast.error("You have to atleast set 1 quantity  ")
  }else{

    const data={
      productId,
      quantity,
    }
    dispatch(addToCart(data))
    toast.success("Item add to Cart Successfuly ")
  }
    
 }
 const handleRatingChange = (value) => {
  setRating(value);
};

const handleCommentChange = (event) => {
  setComment(event.target.value);
};
 const handleSubmit = (event) => {
  event.preventDefault();
  if(!user){
    navigate("/login")
  }
  // add code to save userRating and userComment to state or server
  setShowModal(false);
  setRating(0);
  setComment("");
  dispatch(sendReview({productId:product?._id,user:user?._id,rating,comment,name:user?.name}))
};

  if (product) {
    return (
      <div>
        <ToastContainer/>
        <h2 className="main_heading">Products Details</h2>
        <div className="product_details">
          <div className="product_image">
            <ImageHolder imageUrl={product?.images[0]?.url} />
          </div>
          <div className="product_info">
            <h2>{product.name}</h2>
            <p className="id">Product # {product._id}</p>
            <hr />
            <h2>${product.price}</h2>
            <div className="number_of_products">
              <span>
                <button onClick={()=>decreaseQnty()}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={()=>increaseQnty()}>+</button>
              </span>
              <span className="cart_add" onClick={()=>addCart()}>Add To Cart</span>
            </div>
            <hr />
            <h3>
              Status :
              <span
                className={`${product.stock <= 0 ? "outStock" : "inStock"}`}
              >
                {product.stock <= 0 ? "Out of Stock" : "In Stock"}
              </span>
            </h3>
            <h3>
              Ratings :
              
              <span>
                
                {" " + product.ratings}
                </span>
            </h3>
            <hr />
            <h3>Description</h3>
            <p>{product.description}</p>
            <span className="review_btn" onClick={()=>setShowModal(true)}>Send Review</span>
          </div>
          
        </div>
        {
            showModal && (
              <div className="commentBox">
              <h3 className="main_heading"> Leave a Comment</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <ReactStars
                    count={5}
                    value={rating}
                    onChange={handleRatingChange}
                    size={30}
                    color1="black"
                    color2="white"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="3"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </div>
                
                <button type="submit">Submit</button>
              </form>
              <div className="close" onClick={()=>setShowModal(false)}>
                X
              </div>
            </div>
            )
          }
        <div className="reviews_container">
          {product.reviews.length <= 0 ? (
            <h1 className="main_heading">No Reviews... </h1>
          ) : (
            <>
            <h1 className="main_heading"> Reviews... </h1>

            <div className="reviews">
            
              <button onClick={()=>{
                  {selected ===0?setSelected(product.reviews.length-1):setSelected(selected-1)
                  }

                }}><FcPrevious/></button>
                <ReviewCard review={product.reviews[selected]} />
           
              
                  
                <button onClick={()=>{
                  {selected ===product.reviews.length-1?setSelected(0):setSelected(selected+1)
                  }

                }}><FcNext/></button>
                
                
            </div>
          </>
          )}
        </div>
      </div>
    );
  }
};

export default ProductDetails;
