import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading"
import "./LoginSign.css";
import { BiUserCircle } from "react-icons/bi";

import {MdEmail } from "react-icons/md"
import {MdDriveFileRenameOutline } from "react-icons/md"
import {GoEyeClosed} from "react-icons/go"
import {AiFillEye} from "react-icons/ai"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch,useSelector} from "react-redux"
import { clearErrors, loginUser } from "../../store/reducers/UserReducer";
import { Link } from "react-router-dom";
const LoginSign = () => {
  const [isShowPassword,setIsShowPassword]=useState(false)
  
  const [signUp,setSignUp]=useState({
    email:"",
    password:""
  })

const {loading,error}=useSelector(state=>state.User)
  const dispatch=useDispatch()
useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch(clearErrors())
  }
},[error,dispatch,])
  
  const handelsignup=(e)=>{
    setSignUp({ ...signUp, [e.target.name]: e.target.value });

  }
  const handelSignUpUser=(e)=>{
    e.preventDefault()
    if(!signUp.email || !signUp.password){
      toast.error("Email and password are required.");
      return;
    }

    dispatch(signUpUser(signUp));
  }
  
  if(loading){
    return <Loading/>
  }
  return (
   
            <>
              <div className="form_input_container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form_input"
                />
                <MdEmail/>

              </div>

              <div className="form_input_container">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form_input"
                  />
                <MdDriveFileRenameOutline/>
              </div>

              <div className="form_input_container">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="form_input"
                  />
                {isShowPassword?<AiFillEye/>:<GoEyeClosed/>}

              </div>
              <div className="avatar">
              <BiUserCircle />
                <label htmlFor="avatar" className="avatar_label">
                 
                  Choose 
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  className="avatar_input"
                  />
              </div>
              <button className="form_button">Sign Up</button>
              <br />
              <p className="message">Already Have Account <Link> Log In</Link> </p>
            </>

  );
};

export default LoginSign;
