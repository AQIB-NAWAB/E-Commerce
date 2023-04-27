import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/reducers/ProductReducer";
import "./products.css";
import { useNavigate, useParams } from "react-router-dom";
// slider
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

//
const categories = [

  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Smart Phones",
];
const Products = () => {

const [isCategory,setIsCategory]=useState("")
const [page, setPage] = useState(1);
  const [price, setprice] = useState([0, 25000]);
  function valuetext(value) {
    return `${value} `;
  }
  const navigate = useNavigate();
  const { keyword } = useParams();

  const minDistance = 10;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Products);
const products=useSelector(state=>state.Products.products)
  const handleChange = (event, newValue, activeThumb) => {
     
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setprice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setprice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
   
  };
  let pageWantShow = Math.ceil(products.productCount / 8);

if(keyword){
  pageWantShow=Math.ceil((products.length)/8)
  console.log("keyword : "+ pageWantShow)
}
  const handelPagination = () => {
    setPage(pageWantShow == page ? 1 : page + 1);
  };


  useEffect(() => {
    const data = { keyword: keyword || "", price, page,isCategory};
     dispatch(fetchProducts(data));
  }, [dispatch, keyword, price, page,isCategory]);
 
  
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="main_heading">Our Products</h1>
      <div className="products">
        {products &&
          products.products &&
          products.products.map((single_product) => (
            <ProductCard key={single_product._id} product={single_product} />
          ))}
      </div>
      <div className="filter_box">
        <h3>Price :</h3>
        <br/>
        <br/>
        <Box sx={{width:window.innerWidth<786?"400":"300"}}>
          <Slider
          sx={{ color: 'black',width:window.innerWidth<786?"300px":"200px",zIndex:"0" }}  
            getAriaLabel={() => "Minimum distance"}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="on"
            min={0}
            max={1000}
            getAriaValueText={valuetext}

            disableSwap
            
            
          />
        </Box>
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            {categories.map((category) => (
              <>
                <li key={category} onClick={()=>setIsCategory(category)}>
                  {category}
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>

      {products && products.productCount>= 8 && (
  <div className="pagination">
    <Pagination variant="outlined" color="primary" size="large" count={pageWantShow} page={page} onChange={handelPagination} />
  </div>
)}

    </div>
  );
};

export default Products;
