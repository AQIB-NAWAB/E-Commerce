import { useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home/Home'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Search from './pages/Search/Search'
import Products from './pages/Products/Products'
import LoginSign from './pages/User/LoginSign'
function App() {
 

  return (
   <div className='App'>
<Navbar />
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
  <Route path="/login" element={<LoginSign/>} />
</Routes>

   </div>
  )
}

export default App
