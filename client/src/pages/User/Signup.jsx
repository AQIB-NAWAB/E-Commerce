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

const SignUp = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const handleSignup = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleSignUpUser = (e) => {
    e.preventDefault();
    if (!signUp.email || !signUp.password || !signUp.name) {
      toast.error("Name, email, and password are required.");
      return;
    }

    // dispatch(signUpUser(signUp));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="form_container animate">
        <div className="form_header">
          <h1>Ecommerce Hub</h1>
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
                onChange={handleSignup}
              />
              <MdDriveFileRenameOutline />
            </div>

            <div className="form_input_container">
              <input
                type="email"
                placeholder="Enter your email"
                className="form_input"
                name="email"
                value={signUp.email}
                onChange={handleSignup}
              />
              <MdEmail />
            </div>

            <div className="form_input_container">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="form_input"
                name="password"
                value={signUp.password}
                onChange={handleSignup}
              />
              {isShowPassword ? <AiFillEye /> : <GoEyeClosed />}
            </div>

            <div className="avatar">
              <BiUserCircle
 />
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
              </form>
              <br />
              <p className="message">Already Have Account <Link to="/login"> Log In</Link> </p>

              </div>
      </div>
    </>
  );
};

export default SignUp;
