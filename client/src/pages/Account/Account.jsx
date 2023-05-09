import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import "./Account.css"
import ImageHolder from '../../components/ImageHolder/ImageHolder'
import { useNavigate,Link } from 'react-router-dom'
const Account = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.User.user)
    const {isAuthenticated}=useSelector(state=>state.User)
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/login');
        }
      }, [isAuthenticated, navigate]);
  return (
    <div className='account'>
    <h1>My Profile</h1>
    <div className='account_container'>
    <div className="image_section">
        <img src={user.avatar.url} alt="user" />
       <button>
         <Link to="/update"> Edit Profile</Link>
         </button>
        </div>
        <div className="info_section">
            <span>
            <h4>Full Name</h4>
            <h5>{user.name}</h5>
            
            </span>

            <span>
                <h4>E-mail</h4>
                <h5>{user.email}</h5>
            </span>

            <span>
                <h4>Joined</h4>
                <h5>{user.createdAt}</h5>
            </span>
        </div>    
    </div>
    </div>
  )
}

export default Account