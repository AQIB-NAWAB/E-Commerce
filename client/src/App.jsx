import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import {Routes ,Route} from "react-router-dom"
import Home from './pages/Home/Home'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Search from './pages/Search/Search'
import Products from './pages/Products/Products'
import { useSelector,useDispatch } from 'react-redux'
import UserOption from "./components/UserOptions/UserOption.jsx"
import { loadUser,clearErrors } from './store/reducers/UserReducer'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/User/LogIn'
import SignUp from './pages/User/SignUp.jsx'
import Cart from './pages/Cart/Cart'
import Account from './pages/Account/Account'
import UpdateProfile from './pages/User/UpdateProfile'
import Dashboard from './pages/Admin/Dashboard.jsx'
import NewProduct from './pages/Admin/NewProduct'
import ProductList from './pages/Admin/ProductList'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Shipping from './pages/Shipping/Shipping.jsx'
import ConfirmOrder from './pages/ConfirmOrder/ConfirmOrder.jsx'
import Payment from './pages/Payment/Payment.jsx'

import axios from 'axios'
import UserList from './pages/Admin/UserList'
import UpdateUser from './pages/Admin/UpdateUser'
import ProductReviews from './pages/Admin/ProductReviews'
import Review from './pages/Admin/Review'

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

 const {isAuthenticated,user,error}=useSelector(state=>state.User)
 console.log(user)
 const dispatch=useDispatch()
 if(error){
  toast.error(error)
  dispatch(clearErrors())
 }
useEffect(()=>{
  dispatch(loadUser())
},[dispatch])
  return (
   <div className='App'>
<Navbar />
{isAuthenticated && <UserOption user={user}/>}


<Routes >
  <Route path='/' exact element={<Home/>}/>
  <Route path='/product/:id' element={<ProductDetails/>} 
  /> 
  <Route path='/products' element={<Products/>} 
  /> 
    <Route path='/products/:keyword' element={<Products/>} 
  /> 
  <Route  path='/search' element={<Search/>} 
  /> 
  <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<SignUp/>} />
  <Route path="/cart" element={<Cart/>}/>
{isAuthenticated && <Route exact path="/shipping" element={<Shipping/>} />}
{isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder/>} />}
{isAuthenticated && <Route exact path="/process/payment" element={Payment}/>}
{isAuthenticated && <Route exact path='/account' element={<Account/>} />}

{isAuthenticated && <Route exact path='/update' element={<UpdateProfile/>} />}
{isAuthenticated && user?.user?.role=="admin"  && <Route exact path="/dashboard"  element={<Dashboard/>}/>}
{isAuthenticated && user?.user?.role=="admin" &&  <Route exact path="/product/new" element={<NewProduct/>} />}
{isAuthenticated && user?.user?.role=="admin" && <Route exact path="/admin/products/" element={<ProductList/>} />}
{isAuthenticated && user?.user?.role=="admin" && <Route exact path="/admin/product/update/:id" element={<UpdateProduct/>} />}
{isAuthenticated && user?.user?.role=="admin" && <Route exact path="/admin/users" element={<UserList/>} />}
{isAuthenticated && user?.user?.role=="admin" && <Route exact path="/admin/user/update/:userId" element={<UpdateUser/>} />}

{isAuthenticated && user?.user?.role=="admin" && <Route exact path="/admin/reviews" element={<ProductReviews/>} />}
{isAuthenticated && user?.user?.role=="admin" && <Route exact path="admin/reviews/:revId" element={<Review/>} />}



</Routes>

   </div>
  )
}

export default App
