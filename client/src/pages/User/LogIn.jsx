import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import "./LoginSign.css";
import { MdEmail } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
import { AiFillEye } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../store/reducers/UserReducer";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { loading, error, isAuthenticated } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/account");
      }
    }, [isAuthenticated, navigate]);



  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(clearErrors())
  }, [error]);

  const handelLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handelLoginUser = (e) => {
    e.preventDefault();

    dispatch(loginUser(loginData))

    setLoginData({
      email:"",
      password:""
    })
  };

  if (loading) {
    return <Loading />;
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
                type="email"
                placeholder="Enter your email"
                className="form_input"
                name="email"
                value={loginData.email}
                onChange={handelLoginData}
              />
              <MdEmail />
            </div>
            <div className="form_input_container">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="form_input"
                name="password"
                value={loginData.password}
                onChange={handelLoginData}
              />
              <span onClick={() => setIsShowPassword(!isShowPassword)}>
                {isShowPassword ? <AiFillEye /> : <GoEyeClosed />}
              </span>
            </div>
            <br />
            <button className="form_button" onClick={handelLoginUser}>
              Log In
            </button>

            <br />
            <div className="forgot_password">
              <p>Forgot Password</p>
            </div>
            <br />
          </form>
          <p className="message">
            Dont Have Account
            <Link to="/signup">
              <span>Create Account</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
