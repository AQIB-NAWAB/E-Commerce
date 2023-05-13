import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../../store/reducers/OrderReducer";
import Loading from "../../components/Loading/Loading";
const OrderDetails = () => {
  const {OrderDetails,loading} = useSelector((state) => state.Orders);
let order=OrderDetails?.order
  const dispatch = useDispatch();
const {orderId}=useParams()
  useEffect(() => {
 
    dispatch(getOrderDetails({orderId}));
  }, [dispatch,orderId]);
  console.log(order)
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1> Order #{order && order._id}</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order &&
                      order.orderStatus === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                    style={ order &&
                        order.orderStatus === "succeeded"
                          ? {color:"green"}
                          : {color:"red"}}
                  >
                    {order.paymentInfo &&
                    order.orderStatus === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{ order?.paymentInfo?.totalPrice}</span>
                </div>
              </div>

              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    style={ order &&
                        order.orderStatus === "delivered"
                          ? {color:"green"}
                          : {color:"red"}
                    }>
                    { order?.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
