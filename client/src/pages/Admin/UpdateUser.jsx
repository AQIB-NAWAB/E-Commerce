import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SideBar from "./Sidebar";
import { MdEmail } from "react-icons/md";
    import { MdDriveFileRenameOutline } from "react-icons/md";
    import { GoEyeClosed } from "react-icons/go";
    import { AiFillEye } from "react-icons/ai";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDetails } from "../../store/reducers/UserDetailsReducer";
import { UpdateUserRole } from "../../store/reducers/ProfileReducer";
import { clearErrors } from "../../store/reducers/UserReducer";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
const navigate=useNavigate()
  const { loading, error, user } = useSelector((state) => state.UserDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.Profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { userId } = useParams();
useEffect(()=>{
dispatch(getUserDetails({userId}))
},[])

  useEffect(() => {
    if (user && user?.user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else 
     {
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setRole(user?.user?.role);
    }
    
    if (error) {
      toast.error(error);
      dispatch(clearErrors())
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors())
    }

    if (isUpdated) {
        navigate("/dashboard");
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);
console.log(user)
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();


 

    dispatch(UpdateUserRole({userId,name,email,role}));
    navigate("/dashboard")
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <MdDriveFileRenameOutline/>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MdEmail/>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <AiFillEye/>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
