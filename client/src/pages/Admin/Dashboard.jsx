import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import "./Dashboard.css"
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {useSelector,useDispatch} from "react-redux"
import {getAllUsers} from "../../store/reducers/AllUserReducer"
import { clearDelete, getAllProducts } from '../../store/reducers/AllProductReducer';
import { getAllOrders } from '../../store/reducers/AllOrdersReducer';
import {toast,ToastContainer} from "react-toastify"
import { clearUpdate } from '../../store/reducers/ProductUpdateReducer';
import { clearNewProduct } from '../../store/reducers/NewProductReducer';
import Loading from '../../components/Loading/Loading';

const Dashboard = () => {
  const navigate=useNavigate()
  const productCreated=useSelector(state=>state.NewProduct.newProduct)


  const all_users =useSelector(state=>state.AllUsers.totalUsers)
  

  const all_products=useSelector(state=>state?.AllProducts.totalProducts)

  const productDeleted=useSelector(state=>state?.AllProducts.isDeleted)

  
  const all_orders=useSelector(state=>state?.AllOrders.totalOrders)


  const productUpdated=useSelector(state=>state.ProductUpdate.isUpdated)
  const userUpdated=useSelector(state=>state.Profile.isUpdated)

  const dispatch=useDispatch()
  let outOfStock = 0;

 all_products &&
    all_products?.products?.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
    useEffect(() => {
      dispatch(getAllOrders());
      dispatch(getAllUsers());
      dispatch(getAllProducts());
      
      if (productCreated) {
        toast.success("Product Created Successfully");
        dispatch(clearNewProduct());
      }
    
      if (productUpdated) {
        toast.success("Product Updated Successfully");
        dispatch(clearUpdate());
      }
      if (userUpdated) {
        toast.success("user Updated Successfully");
      }


      if (productDeleted) {
        toast.success("Product Deleted Successfully");
        dispatch(clearDelete());
      }
    }, [dispatch, navigate,productCreated,productDeleted,productUpdated,userUpdated]);
    
   
    
  let totalAmount = 0;
  all_orders &&
    all_orders?.orders?.forEach((item) => {
      totalAmount += item.totalPrice;
    });


  const lineState = {
    
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      }
    ]
  };



  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, all_products?.products?.length - outOfStock],
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard_container">
        <ToastContainer/>
          <h2>Dashboard</h2>
          <div className="dashboard_summary">
            <div>
              <p>Total Amount <br /><br /> $ {totalAmount}</p>
            </div>

            <div className="dashboard_summary_box2">
              <Link to="/admin/products" >
                <p>Products</p>
                <p>{all_products?.products?.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{all_orders?.orders?.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{all_users?.users?.length}</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line  data={lineState} options={options} />

          </div>
          <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
