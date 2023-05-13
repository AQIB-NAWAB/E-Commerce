import React, { useEffect, useState } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import axios from 'axios';

const Payment = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  
  const paymentData = {
    amount: 200
  }
  
  const getStripeApiKey = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/stripeapikey", { withCredentials: true });
    setStripeApiKey(response?.data?.stripeApiKey);
  }
  
  
  
  
  useEffect(() => {
    getStripeApiKey()
  }, [])
  
  return (
    <Elements stripe={loadStripe(stripeApiKey)} >
      <CheckoutForm  />
    </Elements>
  )
}

export default Payment
