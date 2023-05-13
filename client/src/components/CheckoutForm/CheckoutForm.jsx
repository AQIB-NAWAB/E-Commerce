import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const paymentData = {
    amount: 2000
  };

  const getClientSecret = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/payment/process",
        paymentData,
        { withCredentials: true }
      );

      setClientSecret(data.client_secret);
    } catch (error) {
      console.log(error)
    }
  }

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(PaymentElement),
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // Payment succeeded!
      console.log(result.paymentIntent);
    }
  }

  return (
    <div>
      {clientSecret ? (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button disabled={!stripe}>Submit</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default CheckoutForm;
