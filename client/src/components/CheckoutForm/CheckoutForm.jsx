import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '@stripe/stripe-js';
import '@stripe/react-stripe-js';
const CheckoutForm = ({ amount, currency, description }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      metadata: {
        order_id: '12345'
      }
    });
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    const { client_secret } = await axios.post('http://localhost:3000/api/v1/payment/process', {
    amount:200
    },{withCredentials:true}).then(res => res.data);
    console.log(client_secret)
    const { error: confirmError } = await stripe.confirmCardPayment(client_secret, {
      payment_method: paymentMethod.id,
      
    });
    if (confirmError) {
      setErrorMessage(confirmError.message);
    } else {
      setErrorMessage('');
      console.log('Payment successful.');
    }
  };
  const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "rgb(240, 57, 122)",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238"
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{width:"100%",height:"200vh"}}>
      <div style={{width:"100%",height:"100%"}}>
        <label>Card Details</label>
        <CardElement  options={CARD_ELEMENT_OPTIONS}/>
      </div>
      <div>
        <button type="submit">Pay 20</button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </form>
  );
};

export default CheckoutForm;
