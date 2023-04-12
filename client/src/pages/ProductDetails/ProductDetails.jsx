import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Loading from "../../components/Loading/Loading"

import { useDispatch } from 'react-redux';
import { fetchProductDetails } from '../../store/reducers/ProductReducer';
const ProductDetails = () => {
  const {product}=useSelector(state=>state.Products)
  console.log(product)
  const dispatch=useDispatch()
    const {id}=useParams()
    useEffect(()=>{
dispatch(fetchProductDetails(id))
    },[dispatch])
  return (
    <div><h1>
        {id}
        </h1> </div>
  )
}

export default ProductDetails