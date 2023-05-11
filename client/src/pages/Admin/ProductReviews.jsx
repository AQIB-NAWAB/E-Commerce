import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { fetchProducts } from '../../store/reducers/ProductReducer'
import { useDispatch, useSelector } from 'react-redux'
import "./ProductReviews.css"
import { Link } from 'react-router-dom'
const ProductReviews = () => {
  const dispatch=useDispatch()
  const all_products=useSelector(state=>state.Products?.products?.products)
  let reviwed_products=all_products &&  all_products.filter(pro=>  pro.reviews.length>0)
  console.log(all_products)
  useEffect(()=>{
dispatch(fetchProducts(""))
  },[dispatch])
  return (
    <div>
      <div className="productReviews">
        <Sidebar/>
        <div className="productReviwesContainer">
{reviwed_products &&
reviwed_products.length ==0 ? <h1 className='main_heading'>No Products....</h1>:reviwed_products&& reviwed_products.map(pro=>(
  <div className="product">
    <Link to={`/admin/reviews/${pro._id}`}>
    <img src={pro.images[0].url} alt={pro.name} />
    <div className="comment"> {pro.reviews.length}</div>
     </Link>
  </div>
))
}

        </div>
      </div>
    </div>
  )
}

export default ProductReviews