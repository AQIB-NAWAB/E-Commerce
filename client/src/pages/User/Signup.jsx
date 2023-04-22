  import React, { useEffect, useState } from "react";
  import Loading from "../../components/Loading/Loading"
  import "./LoginSign.css";
  import { BiUserCircle } from "react-icons/bi";
  import { MdEmail } from "react-icons/md";
  import { MdDriveFileRenameOutline } from "react-icons/md";
  import { GoEyeClosed } from "react-icons/go";
  import { AiFillEye } from "react-icons/ai";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useDispatch, useSelector } from "react-redux";
  import { clearErrors } from "../../store/reducers/UserReducer";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { registerUser } from "../../store/reducers/UserReducer"; 
  const SignUp = () => {
    const [avatar, setAvatar] = useState(null);
    const [signUp, setSignUp] = useState({
      name: "",
      email: "",
      password: "",

    });
    const {error,loading}=useSelector(state=>state.User)
    const dispatch=useDispatch()
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
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
      }
    };

    const handleSignUpUser = () => {
      if (!signUp.email || !signUp.password || !signUp.name) {
        toast.error("Name, email, and password are required.");
        return;
      }
      dispatch(registerUser({ ...signUp, avatar: avatar }));
    };

    if(loading){
      return <Loading/>
    }
    return (
      <div className="form_container animate">
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
            </div>

            <div className="form_input_container">
              <input
                type="password"
                placeholder="Enter your Password"
                className="form_input"
                name="password"
                value={signUp.password}
                onChange={handleSignupData}
              />
            </div>

            <div className="avatar">
              <img src={avatar} alt="Avatar" />
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
    );
  };

  export default SignUp;