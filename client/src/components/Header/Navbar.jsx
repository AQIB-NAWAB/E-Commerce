import React from 'react'
import { useState } from 'react'
// Css 
import "./navbar.css"
import {Link} from "react-router-dom"
import {BsSearch,BsCart4} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import {RxCross2} from "react-icons/rx"
import {FaBars} from "react-icons/fa"
const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false)
  const changeNavbar=()=>{
    setIsOpen(!isOpen)
  }
  return (
    <div className={`navbar  ${isOpen? "show_navbar" : "close_navbar" }  `} >
<span className='navbar_brand'>

<Link to="/">E-Commerce</Link>
</span>
<div className="middle_nav">
  <span>
<Link>Home</Link>
<Link>Product</Link>
  </span>
  <span>
<Link>Contact</Link>
<Link>About</Link>
  </span>
</div>

<div className="right_navbar">
<Link><BsSearch size={20}/></Link>
<Link><BsCart4 size={20}/></Link>
<Link><CgProfile size={20}/></Link>
</div>

<span className='close_icon' onClick={()=>changeNavbar()}>
  {isOpen?<RxCross2 color='white' size={25} />:<FaBars color='white' size={25}/>}

</span>
    </div>
  )
}

export default Navbar