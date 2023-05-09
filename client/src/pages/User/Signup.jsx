    import React, { useEffect, useState } from "react";
    import Loading from "../../components/Loading/Loading"
    import "./LoginSign.css";
import Avatar from '@mui/material/Avatar';

    import { MdEmail } from "react-icons/md";
    import { MdDriveFileRenameOutline } from "react-icons/md";
    import { GoEyeClosed } from "react-icons/go";
    import { AiFillEye } from "react-icons/ai";
    import { toast, ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import { useDispatch, useSelector } from "react-redux";
    import { clearErrors } from "../../store/reducers/UserReducer";
    import { Link } from "react-router-dom";
    import { registerUser } from "../../store/reducers/UserReducer"; 
    import { useNavigate } from "react-router-dom";
    const SignUp = () => {
      const navigate=useNavigate()
  const [isShowPassword, setIsShowPassword] = useState(false);

      const [avatar, setAvatar] = useState(null);
      const [signUp, setSignUp] = useState({
        name: "",
        email: "",
        password: "",

      });
      const {isAuthenticated,error,loading}=useSelector(state=>state.User)
      const dispatch=useDispatch()
      useEffect(() => {
        if (isAuthenticated) {
          navigate("/account");
        }
      }, [isAuthenticated, navigate]);
  useEffect(()=>{
    
  if(error){
    toast.error(error)
  }
  dispatch(clearErrors())
  },[error,dispatch])
  const handleSignupData = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (file.size > 1024 * 1024) { // check if file size is greater than 1MB
            toast.error("Image size must be less than 1MB.");
            return;
          }
          setAvatar(reader.result);
        }
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setSignUp({ ...signUp,[e.target.name]: e.target.value });
    }
  };
    
      const handleSignUpUser = () => {
        if (!signUp.email || !signUp.password || !signUp.name) {
          toast.error("Name, email, and password are required.");
          return;
        }
        dispatch(registerUser({...signUp,avatar:avatar}));
      };

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
              <div className="form_input_container">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form_input"
                  name="name"
                  value={signUp.name}
                  onChange={handleSignupData}
                />
                <MdDriveFileRenameOutline/>
              </div>

              <div className="form_input_container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form_input"
                  name="email"
                  value={signUp.email}
                  onChange={handleSignupData}
                />
                <MdEmail/>
              </div>

              <div className="form_input_container">
                <input
                  type={`${isShowPassword?"text":"password"}`}
                  placeholder="Enter your Password"
                  className="form_input"
                  name="password"
                  value={signUp.password}
                  onChange={handleSignupData}
                />
                <span onClick={()=>setIsShowPassword(!isShowPassword)}> {isShowPassword?<AiFillEye/>:<GoEyeClosed/>}
                </span>
              </div>

              <div className="avatar">
               <img src= {avatar ||"./images/user.png"} alt="user picture hai" />
                <label htmlFor="avatar" className="avatar_label">
                  Choose
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  className="avatar_input"
                  onChange={handleSignupData}
                />
              </div>

              <button
                type="button"
                className="form_button"
                onClick={handleSignUpUser}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        </>
      );
    };

    export default SignUp;