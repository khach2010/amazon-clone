import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';

import './Payment.css';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret which allow us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async e => {
    // handle stripe payment process ...
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace('/orders');
      });
  };
  const handleChange = e => {
    // Listen for changes in CardElement & display any errors if the customers types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Adress</h3>
          </div>
          <div className='payment__adress'>
            <p>{user?.email}</p>
            <p>123 React adress</p>
            <p>Rotterdam , Netherlands</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review Items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(({ id, title, image, price, rating }) => (
              <CheckoutProduct
                id={id}
                title={title}
                image={image}
                price={price}
                rating={rating}
              />
            ))}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={value => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'€'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : <p>Buy Now</p>}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
