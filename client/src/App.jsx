import { useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home/Home'
import ProductDetails from './pages/ProductDetails/ProductDetails'
function App() {
 

  return (
   <div className='App'>
<Navbar />
<Routes>
  <Route path='/' exact element={<Home/>}/>
  <Route path='/product/:id' element={<ProductDetails/>} 
  /> 
</Routes>
   </div>
  )
}

export default App
