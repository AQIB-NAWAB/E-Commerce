import React, { useEffect } from 'react'
import Sidebar from '../Admin/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../../store/reducers/OrderReducer'
import { Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'

const Orders = () => {
    const dispatch=useDispatch()
    const allOrders=useSelector(state=>state.Orders?.Orders?.orders)
    useEffect(()=>{
        dispatch(getMyOrders())
    },[])
    console.log(allOrders)
  return (
    <div>
        <div className="userList">
            <Sidebar/>
            <div className="userListContainer">
                <h2 className='main_heading'>All Orders</h2>
            <table>
                        <thead>
                            <tr>
                                <th> Id</th>
                                <th>Status</th>
                                <th>Item Qty</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               allOrders &&  allOrders.map(order=>(
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td style={order.orderStatus==="Delivered" ? {color:"green"}:{color:"red"}}>{order.orderStatus}</td>
                                        <td>{order?.orderItems[0]?.quantity}</td>
                                        <td>{order?.orderItems[0].price}</td>

                                        <td className='actions'>
                                            <span>
                                                <Link to={`/order/${order._id}`}>
                                                    <FiEdit color='gray'/>
                                                </Link>
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

export default Orders