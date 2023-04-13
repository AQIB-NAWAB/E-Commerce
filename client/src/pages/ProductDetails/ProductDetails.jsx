import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading/Loading";
import ImageHolder from "../../components/ImageHolder/ImageHolder";
import { fetchProductDetails } from "../../store/reducers/ProductReducer";
import "./productDetails.css"
import ReviewCard from "../../components/ReviewCard/ReviewCard";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  const state = useSelector((state) => state.Products);

  const product = state.single_product_details.product;

 

  if (state.loading) {
    return <Loading />;
  }

  if(product){
    return (
      <div>
    <h2 className="main_heading">Products Details</h2>
    <div className="product_details">
      
    <div className="product_image">
      <ImageHolder imageUrl={product.images[0].url} />
    </div>
    <div className="product_info">
      <h2>{product.name}</h2>
      <p className="id">Product # {product._id}</p>
      <hr />
      <h2>${product.price}</h2>
      <div className="number_of_products">
        
        <span>
        <button>-</button>
        <input type="number" value={1}/>
        <button>+</button>
        </span>
        <span className="cart">Add To Cart</span>
      </div>
      <hr/>
      <h3>Status : <span className={`${product.stock<=0?"outStock":"inStock"}`}>{product.stock<=0?"Out of Stock":"In Stock"}</span></h3>
      <hr />
      <h3>
        Description
      </h3>
      <p>{product.description}</p>
      <span className="review_btn">Send Review</span>
    </div>
  </div>
  <div className="reviews_container">
    {
      product.reviews.length <=0?(
        <h1>No Reviews</h1>
      )
      
      :(
        <div className="reviews">
        {product.reviews.map((review) => (
          <ReviewCard review={review} key={review._id} />
        ))}
      </div>
      )
    }
  </div>
    </div>
    )
  }  
};

export default ProductDetails;
