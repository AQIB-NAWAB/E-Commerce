import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { CiFaceSmile } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { updateProfile } from "../../store/reducers/ProfileReducer";
import { loadUser } from "../../store/reducers/UserReducer.jsx";
import { clearErrors } from "../../store/reducers/ProfileReducer";
import { toast, ToastContainer } from "react-toastify";
import {useNavigate} from "react-router-dom"
const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User.user);
  const { error, isUpdated, loading } = useSelector((state) => state.Profile);
  console.log(user);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
const navigate=useNavigate()
  const updateProfileSubmit = (e) => {
    e.preventDefault();
if(!name  && !email && !password){
  toast.error("Enter Data")
}
    
  const data={
    name,
    email,
    avatar
  }
    dispatch(updateProfile(data));
    
    if (isUpdated) {
      toast.error("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

    }
  };

  const updateProfileDataChange = (e) => {
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
  };


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    
  }, [dispatch, error, , user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <CiFaceSmile />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
