import React from 'react'
import List from '@mui/material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./Sidebar.css"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {FiUsers} from "react-icons/fi"
import {BsChatRightText} from "react-icons/bs"
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    }
  return (
    <div className='sidebar'>
        <ul>
                <Link to="/dashboard">
            <li> 
              
                <span>  <DashboardIcon/></span>
                <p>Dashboard</p>
            </li>
                </Link>
            <li>
      <div className={`dropdown ${open?'show_dropdown':'hide_dropdown'}`}>
        <h3 onClick={handleClick}> {open ? <ExpandLess/>:<ExpandMore/>} Products</h3>

        <Link to="/admin/products" > <li>All</li></Link>
        <Link to="/product/new"><li>Create</li></Link>

        </div>      
      
            </li>
            <li>
                <span><ViewListIcon/></span>
                <p>Orders</p>
            </li>
            <Link to="/admin/users">
            <li>
                <span><FiUsers/></span>
                <p>Users</p>
            </li></Link>
            <Link to="/admin/reviews">

            <li>
                <span><BsChatRightText/></span>
                <p>Reviwes</p>
            </li>
            </Link>
        </ul>
    </div>
  )
}

export default Sidebar