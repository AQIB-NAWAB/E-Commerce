import React, { useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeFromCart } from "../../store/reducers/CartReducer";
import {Link} from "react-router-dom"
import {BsCartXFill} from "react-icons/bs"
const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.Cart.items);
  
  // calculate total quantity and total price
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

  const increaseQnty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    console.log(quantity);
    if (stock <= quantity) {
      return;
    } else {
      dispatch(addToCart({ productId: id, quantity: 1 }));
    }
  };

  const decreaseQnty = (id, quantity) => {
    let newQty = quantity - 1;
    quantity = newQty - quantity;

    if (newQty < 1) {
      return;
    } else {
      dispatch(
        addToCart({
          productId: id,
          quantity,
        })
      );
    }
  };

  return (
  <>
    <div className="cart">
      <h2 className="cart__title ">Your Cart</h2>
      <hr />
      {items.length === 0 ? (
        <div className="empty_cart">
        <p className="cart__empty">Your cart is empty.</p>
        <BsCartXFill/>
        <br />
        <br />
        <br />
        <Link to="/products"><button>Check Products</button></Link>
        </div>
      ) : (
        <>
        <div className="cart_main_header">
          <h3> Image </h3>
          <h3>Product </h3>
          <h3>Quantity</h3>
          <h3>  Total</h3>
          <h3>Remove</h3>
        </div>
          
          <div className="cart__items">
            {items.map((item) => (
              <div className="cart__item" key={item.productId}>
                <img
                  className="cart__item-image"
                  src={item.images[0].url}
                  alt={item.name}
                />
                <div className="cart__item-info">
                  <h3 className="cart__item-name">{item.name.slice(0,6)}...</h3>
                  <br />
                  <h3>  ${item.price}</h3>
                </div>
                <div className="cart_quantity">
                  <button onClick={() => decreaseQnty(item._id, item.quantity)}>
                    -
                  </button>
                  <input readOnly type="number" value={item.quantity} />
                  <button
                    onClick={() =>
                      increaseQnty(item._id, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="item_price">
                    ${item.quantity*item.price}
                </div>
                <button onClick={()=>dispatch(removeFromCart(item._id))} className="remove">Remove</button>
              </div>
            ))}
          </div>
        </>
      )}


    </div>
    {
      items.length>0?(
<div className="checkout">
  <h3>Payment To Be Here</h3>
  <h4>Your Total is <br/><br/>  ${totalPrice}</h4>
  <button className="checkout">Checkout</button>
</div>
      ):""
    }
  </>

  );
};

export default Cart;
