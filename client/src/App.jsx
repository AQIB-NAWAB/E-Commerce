import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import {Routes,Route} from "react-router-dom"
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
import SignUp from './pages/User/Signup'
import Cart from './pages/Cart/Cart'
import Account from './pages/Account/Account'
function App() {
 const {isAuthenticated,user,error}=useSelector(state=>state.User)
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


<Routes>
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
{isAuthenticated && <Route path='/account' element={<Account/>}/>}  
</Routes>

   </div>
  )
}

export default App
