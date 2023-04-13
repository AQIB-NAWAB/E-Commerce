import React,{useEffect} from 'react'
import "./home.css"
import {BsMouse} from "react-icons/bs"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useSelector } from 'react-redux';
import Loading from "../../components/Loading/Loading"

import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/reducers/ProductReducer';
const Home = () => {
  const { loading, products } = useSelector(state => state.Products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
if(loading){
  return <Loading/>
}

  return (
    <div className='home'>
      <div className="banner">
        <p>Welcome To E-Commerce</p>
        <h1>Find Amazing Products Below</h1>
        <button><a href="#products">Scroll <BsMouse/></a></button>
      </div>

      <div className="featured_products" id='products'>
        <div className="heading">
          <h2>Featured Products</h2>
        </div>

        <div className="products">
          {
            products && products.products && products.products.map((single_product) =>
            <ProductCard key={single_product._id} product={single_product}/>
 
          )}
        </div>
      </div>
    </div>
  );
};
export default Home