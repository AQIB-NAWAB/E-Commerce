import React from 'react'
import { useState } from 'react'
// Css 
import "./navbar.css"
import {Link} from "react-router-dom"
import {BsSearch,BsCart4} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import {RxCross2} from "react-icons/rx"
import {FaBars} from "react-icons/fa"
import Badge from '@mui/material/Badge';

import  {useSelector} from "react-redux"
const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false)
  const {items}=useSelector(state=>state.Cart)
  const changeNavbar=()=>{
    setIsOpen(!isOpen)
  }
  const close_navbar=()=>{
    setIsOpen(false)
  }
  return (
    <div className={`navbar  ${isOpen? "show_navbar" : "close_navbar" }  `} >
<span className='navbar_brand'>

<Link onClick={()=>close_navbar()} to="/">E-Commerce</Link>
</span>
<div className={`middle_nav ${isOpen?"show":"not_show"}`} >
  <span>
<Link onClick={()=>close_navbar()} to="/">Home</Link>
<Link onClick={()=>close_navbar()} to="/products">Products</Link>
  </span>
  <span>
<Link onClick={()=>close_navbar()}>Contact</Link>
<Link onClick={()=>close_navbar()}>About</Link>
  </span>
</div>

<div className={`right_navbar ${isOpen?"show":"not_show"}`}>
<Link onClick={()=>close_navbar()} to="/search"><BsSearch size={20}/></Link>
<Badge badgeContent={items.length} color="primary">
      
<Link onClick={()=>close_navbar()} to="/cart"><BsCart4 size={20}/></Link>
    </Badge>
<Link onClick={()=>close_navbar()} to="/login"><CgProfile size={20}/></Link>
</div>

<span className='close_icon' onClick={()=>changeNavbar()}>
  {isOpen?<RxCross2 color='white' size={25} />:<FaBars color='white' size={25}/>}

</span>
    </div>
  )
}

export default Navbar