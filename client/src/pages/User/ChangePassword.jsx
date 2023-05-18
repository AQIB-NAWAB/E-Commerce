import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../store/reducers/UserReducer'
import { ToastContainer, toast } from 'react-toastify'
import "./changePassword.css"
import {useNavigate} from "react-router-dom"
const ChangePassword = () => {
const navigate=useNavigate()
    const dispatch=useDispatch()
const {error,isAuthenticated} =useSelector(state=>state.User)

    const [data,setData]=useState({
        oldPassword:"",
        confirmPassword:"",
        newPassword:"",
    })
    useEffect(()=>{
if(error){
    toast.error(error)
}


    },[dispatch])
    const handelChange=(e)=>{
e.preventDefault()
setData({

    ...data,
    [e.target.name]:e.target.value
}
)
    }


    const submitData=()=>{
        const oldPassword=data.oldPassword
        const newPassword=data.newPassword
        const confirmPassword=data.confirmPassword
dispatch(updatePassword({oldPassword,newPassword,confirmPassword})).then((res)=>{
    if(res.error && res.error.message!="Rejected"){
        navigate("/account")
    }else if(res.payload.success==true){
        navigate("/account")

    }
})

    }

    
  return (
    <div className='updatePassword'>
        <ToastContainer/>
        <input type="password" name='oldPassword' value={data.oldPassword} onChange={handelChange} placeholder='OLD PASSWORD' />
        
        <input type="password" name='confirmPassword' value={data.confirmPassword} onChange={handelChange} placeholder='NEW PASSWORD'/>

        <input type="password" name='newPassword' value={data.newPassword} onChange={handelChange} placeholder='CONFIRM PASSWORD'/>
        <button onClick={()=>submitData()}>Update Password</button>
    </div>
  )
}

export default ChangePassword