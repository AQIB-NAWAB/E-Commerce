import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { deleteUser, getAllUsers } from '../../store/reducers/AllUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import "./UserList.css"
import { ToastContainer, toast } from 'react-toastify'
const UserList = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [allUsers, setAllUsers] = useState([]); // store all users in state

    const delete_user = (id) => {
        setAllUsers(allUsers.filter((user) => user._id !== id));
        dispatch(deleteUser({ id }));
        toast.success("User deleted Succesfully");
    };
    
    
    useEffect(()=>{
        dispatch(getAllUsers());
    }, [dispatch, navigate]);

    // Update allUsers when AllUsers changes
    let all_users=useSelector(state=>state.AllUsers?.totalUsers?.users)
    useEffect(() => {
        setAllUsers(all_users);
    }, [dispatch,navigate]);
    
    return (
        <div>
            <div className="userList">
                <ToastContainer/>
                <Sidebar/>
                <div className="userListContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               allUsers &&  allUsers.map(user=>(
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.name}</td>
                                        <td style={user.role==="admin" ? {color:"green"}:{color:"red"}}>{user.role}</td>
                                        <td className='actions'>
                                            <span>
                                                <Link to={`/admin/user/update/${user._id}`}>
                                                    <FiEdit color='gray'/>
                                                </Link>
                                            </span>
                                            <span onClick={() =>delete_user(user._id)}>
                                                <FiTrash2 color='red'/>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList
