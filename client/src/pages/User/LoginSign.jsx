import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading"
import "./LoginSign.css";
import { BiUserCircle } from "react-icons/bi";
import  {TfiShiftRight} from "react-icons/tfi"
import {MdEmail } from "react-icons/md"
import {TbPassword} from "react-icons/tb"
import {MdDriveFileRenameOutline } from "react-icons/md"
import {GoEyeClosed} from "react-icons/go"
import {AiFillEye} from "react-icons/ai"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch,useSelector} from "react-redux"
import { clearErrors, loginUser } from "../../store/reducers/UserReducer";
const LoginSign = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isShowPassword,setIsShowPassword]=useState(false)
  
  const [loginData,setLoginData]=useState({
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
  
  const handelLoginData=(e)=>{
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  }
  const handelLoginUser=(e)=>{
    e.preventDefault()
    if(!loginData.email || !loginData.password){
      toast.error("Email and password are required.");
      return;
    }
    const {email,password}=loginData
    dispatch(loginUser(loginData));
  }
  
  if(loading){
    return <Loading/>
  }
  return (
    <>
        <ToastContainer />
    <div className="form_container animate">
      <div className="form_header">
        <h1> Ecommerce Hub</h1>
      </div>
      <div className="form_body">
        <form>
          {isLogin ? (
            <>
              <div className="form_input_container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form_input"
                  name="email"
                  value={loginData.email}
                  onChange={handelLoginData}
                />
                <MdEmail/>
              </div>
              <div className="form_input_container">
                <input
                  type={isShowPassword?"text":"password"}
                  placeholder="Enter your Password"
                  className="form_input"
                  name="password"
                  value={loginData.password}
                  onChange={handelLoginData}
                />
                <span onClick={()=>setIsShowPassword(!isShowPassword)}>{isShowPassword?<AiFillEye/>:<GoEyeClosed/>}</span>
              </div>
          <br />  
          <button className="form_button" onClick={handelLoginUser}>Log In</button>

            
              <br />
              <div className="forgot_password">
                <p>Forgot Password</p>
              </div>
              <br />
              <p className="message">Dont Have Account <span onClick={()=>setIsLogin(!isLogin)}>Create Account</span> </p>
            </>
          ) : (
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
              <p className="message">Already Have Account <span onClick={()=>setIsLogin(!isLogin)}>Log In</span> </p>
            </>
          )}
        </form>
      </div>
    </div>
          </>
  );
};

export default LoginSign;
